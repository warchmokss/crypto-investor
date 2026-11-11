import 'dotenv/config';
import express from 'express';
import helmet from 'helmet';
import compression from 'compression';
import cors from 'cors';
import rateLimit from 'express-rate-limit';
import pinoHttp from 'pino-http';
import Redis from 'ioredis';
import { RedisStore } from 'rate-limit-redis';
import pg from 'pg';
import { createHmac, timingSafeEqual } from 'node:crypto';
import { readFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import path from 'node:path';
import { UPGRADES, ASSETS, ALL_ASSETS, getIncome } from './catalog.js';

const { Pool } = pg;
const app = express();
const pool = new Pool({ connectionString: process.env.DATABASE_URL, max: Number(process.env.PG_POOL_MAX || 20), idleTimeoutMillis: 30000, connectionTimeoutMillis: 5000 });
const redis = process.env.REDIS_URL ? new Redis(process.env.REDIS_URL, { maxRetriesPerRequest: 2, enableReadyCheck: true }) : null;
const PORT = Number(process.env.PORT || 3000);
const BOT_TOKEN = process.env.BOT_TOKEN;
const TOKEN_SECRET = process.env.SESSION_SECRET;
const MAX_OFFLINE_MINUTES = 8 * 60;

if (!BOT_TOKEN || !TOKEN_SECRET || TOKEN_SECRET.length < 32) throw new Error('Set BOT_TOKEN and SESSION_SECRET (at least 32 characters) in .env');
app.set('trust proxy', Number(process.env.TRUST_PROXY_HOPS || 1));
app.use(pinoHttp()); app.use(helmet({ contentSecurityPolicy: false })); app.use(compression());
app.use(cors({ origin: (process.env.ALLOWED_ORIGINS || '').split(',').filter(Boolean), credentials: false }));
app.use(express.json({ limit: '16kb' }));
app.use('/api/', rateLimit({ windowMs: 60_000, limit: 240, standardHeaders: 'draft-7', legacyHeaders: false, ...(redis ? { store: new RedisStore({ sendCommand: (...args) => redis.call(...args) }) } : {}) }));

function verifyTelegramInitData(initData) {
  if (typeof initData !== 'string' || initData.length > 4096) throw new Error('Telegram initData отсутствует или слишком длинный');
  const params = new URLSearchParams(initData); const hash = params.get('hash');
  if (!hash || !/^[a-f0-9]{64}$/i.test(hash)) throw new Error('Некорректная подпись Telegram');
  params.delete('hash');
  const authDate = Number(params.get('auth_date'));
  if (!Number.isFinite(authDate) || Math.abs(Date.now()/1000 - authDate) > 86400) throw new Error('Сессия Telegram устарела. Перезапусти игру.');
  const dataCheckString = [...params.entries()].sort(([a],[b]) => a.localeCompare(b)).map(([k,v]) => `${k}=${v}`).join('\n');
  const secret = createHmac('sha256', 'WebAppData').update(BOT_TOKEN).digest();
  const calculated = createHmac('sha256', secret).update(dataCheckString).digest('hex');
  const a = Buffer.from(calculated, 'hex'), b = Buffer.from(hash, 'hex');
  if (a.length !== b.length || !timingSafeEqual(a,b)) throw new Error('Не удалось подтвердить аккаунт Telegram');
  const user = JSON.parse(params.get('user') || 'null');
  if (!user?.id || !Number.isSafeInteger(Number(user.id))) throw new Error('В initData нет корректного пользователя');
  return { id: String(user.id), username: user.username || null, firstName: user.first_name || 'Игрок' };
}
function makeSession(user) {
  const payload = Buffer.from(JSON.stringify({ sub:user.id, exp:Date.now()+7*86400000 })).toString('base64url');
  const sig = createHmac('sha256', TOKEN_SECRET).update(payload).digest('base64url'); return `${payload}.${sig}`;
}
function auth(req,res,next) {
  try {
    const token = (req.headers.authorization || '').replace(/^Bearer\s+/i,''); const [payload,sig] = token.split('.');
    if (!payload || !sig) throw new Error('Требуется авторизация');
    const expected = createHmac('sha256',TOKEN_SECRET).update(payload).digest(); const actual=Buffer.from(sig,'base64url');
    if (expected.length!==actual.length || !timingSafeEqual(expected,actual)) throw new Error('Недействительная сессия');
    const data=JSON.parse(Buffer.from(payload,'base64url').toString()); if (!data.sub || data.exp<Date.now()) throw new Error('Сессия истекла');
    req.playerId=data.sub; next();
  } catch(e) { res.status(401).json({ error:e.message || 'Не авторизован' }); }
}
async function transaction(fn) { const c=await pool.connect(); try { await c.query('BEGIN'); const result=await fn(c); await c.query('COMMIT'); return result; } catch(e) { await c.query('ROLLBACK'); throw e; } finally { c.release(); } }
async function getState(client,id,applyIncome=true) {
  const p=(await client.query('SELECT * FROM players WHERE telegram_id=$1 FOR UPDATE',[id])).rows[0];
  if (!p) throw Object.assign(new Error('Игрок не найден'),{status:404});
  const [up,assets]=await Promise.all([
    client.query('SELECT upgrade_id FROM player_upgrades WHERE telegram_id=$1',[id]),
    client.query('SELECT asset_id,level FROM player_assets WHERE telegram_id=$1',[id])
  ]);
  const levels=Object.fromEntries(assets.rows.map(x=>[x.asset_id,x.level]));
  const income=assets.rows.reduce((sum,x)=>{const a=ALL_ASSETS.find(z=>z.id===x.asset_id);return sum+(a?getIncome(a,x.level):0)},0);
  if (applyIncome) {
    const elapsed=Math.min(MAX_OFFLINE_MINUTES,Math.max(0,(Date.now()-new Date(p.last_income_at).getTime())/60000));
    const earned=Math.floor(income*elapsed);
    if(earned>0) await client.query('UPDATE players SET balance=balance+$2,last_income_at=NOW(),updated_at=NOW() WHERE telegram_id=$1',[id,earned]);
    else await client.query('UPDATE players SET last_income_at=NOW() WHERE telegram_id=$1',[id]);
    p.balance=Number(p.balance)+earned;
  }
  return { player:{telegramId:String(p.telegram_id),username:p.username,firstName:p.first_name,balance:Number(p.balance),taps:Number(p.taps),tapReward:p.tap_reward}, owned:assets.rows.map(x=>x.asset_id), purchasedUpgrades:up.rows.map(x=>x.upgrade_id), propertyLevels:levels, passiveIncome:income };
}
app.post('/api/auth/telegram', async (req,res,next)=>{ try {
  const user=verifyTelegramInitData(req.body?.initData);
  await pool.query(`INSERT INTO players(telegram_id,username,first_name) VALUES($1,$2,$3) ON CONFLICT(telegram_id) DO UPDATE SET username=EXCLUDED.username,first_name=EXCLUDED.first_name,updated_at=NOW()`,[user.id,user.username,user.firstName]);
  await pool.query(`UPDATE players SET tap_reward=50 WHERE telegram_id=$1 AND tap_reward=500 AND NOT EXISTS (SELECT 1 FROM player_upgrades WHERE telegram_id=$1)`,[user.id]);
  res.json({ token:makeSession(user) });
 } catch(e){next(Object.assign(e,{status:401}));} });
app.get('/api/game/state',auth,async(req,res,next)=>{try{const state=await transaction(c=>getState(c,req.playerId));res.json(state);}catch(e){next(e)}});
app.post('/api/game/tap',auth,async(req,res,next)=>{try{
 const state=await transaction(async c=>{const s=await getState(c,req.playerId);const result=await c.query('UPDATE players SET taps=taps+1,balance=balance+tap_reward+CASE WHEN (taps+1)%100=0 THEN 500 ELSE 0 END,updated_at=NOW() WHERE telegram_id=$1 RETURNING balance,taps,tap_reward',[req.playerId]);s.player.balance=Number(result.rows[0].balance);s.player.taps=Number(result.rows[0].taps);return {...s,bonus:s.player.taps%100===0?500:0};});res.json(state);
 }catch(e){next(e)}});
app.post('/api/game/crossword-reward',auth,async(req,res,next)=>{try{const level=req.body?.level;const answers=req.body?.answers;const easy=new Set(['КОШКА','ЯБЛОКО','ЗИМА','МОРЕ','СОЛНЦЕ','КНИГА','РЫБА','ЛИМОН','ШКОЛА','СНЕГ','ГРИБ','ОКНО']);const medium=new Set(['КОМПАС','ПЛАНЕТА','РАДУГА','ПИРАМИДА','ЛАБИРИНТ','ТЕЛЕСКОП','БИБЛИОТЕКА','ВУЛКАН','МОЛЕКУЛА','ОРБИТА','АРХИПЕЛАГ','ГРАВИТАЦИЯ','ЭКВАТОР','МЕТЕОРИТ','КРИСТАЛЛ']);const allowed=level==='easy'?easy:level==='medium'?medium:null;const expected=level==='easy'?4:5;if(!allowed||!Array.isArray(answers)||answers.length!==expected||answers.some(x=>typeof x!=='string'||!allowed.has(x)))throw Object.assign(new Error('Ответы кроссворда не прошли проверку'),{status:400});const state=await transaction(async c=>{const prev=(await c.query('SELECT last_claim_at FROM player_crossword_claims WHERE telegram_id=$1 FOR UPDATE',[req.playerId])).rows[0];if(prev&&Date.now()-new Date(prev.last_claim_at).getTime()<600000)throw Object.assign(new Error('Следующая награда будет доступна через 10 минут после прошлого кроссворда.'),{status:429});await c.query('UPDATE players SET balance=balance+5000,updated_at=NOW() WHERE telegram_id=$1',[req.playerId]);await c.query('INSERT INTO player_crossword_claims(telegram_id,last_claim_at) VALUES($1,NOW()) ON CONFLICT(telegram_id) DO UPDATE SET last_claim_at=NOW()',[req.playerId]);return getState(c,req.playerId,false)});res.json(state);}catch(e){next(e)}});
app.post('/api/game/transfer',auth,async(req,res,next)=>{try{const username=String(req.body?.username||'').replace(/^@/,'').trim();const amount=Number(req.body?.amount);if(!/^[A-Za-z0-9_]{5,32}$/.test(username)||!Number.isSafeInteger(amount)||amount<1||amount>1000000000)throw Object.assign(new Error('Проверь username и сумму перевода'),{status:400});const result=await transaction(async c=>{const recipient=(await c.query('SELECT telegram_id,username FROM players WHERE lower(username)=lower($1)',[username])).rows[0];if(!recipient)throw Object.assign(new Error('Игрок с таким username не найден. Он должен хотя бы один раз открыть приложение.'),{status:404});if(String(recipient.telegram_id)===String(req.playerId))throw Object.assign(new Error('Нельзя переводить самому себе'),{status:400});const debit=await c.query('UPDATE players SET balance=balance-$2,updated_at=NOW() WHERE telegram_id=$1 AND balance >= $2 RETURNING balance',[req.playerId,amount]);if(!debit.rowCount)throw Object.assign(new Error('Недостаточно средств'),{status:400});await c.query('UPDATE players SET balance=balance+$2,updated_at=NOW() WHERE telegram_id=$1',[recipient.telegram_id,amount]);await c.query('INSERT INTO player_transfers(sender_id,recipient_id,amount) VALUES($1,$2,$3)',[req.playerId,recipient.telegram_id,amount]);const state=await getState(c,req.playerId,false);return {state,recipient:recipient.username||username};});res.json(result);}catch(e){next(e)}});
app.post('/api/game/buy-upgrade',auth,async(req,res,next)=>{try{const {upgradeId}=req.body||{};const u=UPGRADES.find(x=>x.id===upgradeId);if(!u)throw Object.assign(new Error('Неизвестный апгрейд'),{status:400});const state=await transaction(async c=>{const s=await getState(c,req.playerId);if(s.purchasedUpgrades.includes(u.id))throw Object.assign(new Error('Апгрейд уже куплен'),{status:409});if(s.player.balance<u.cost)throw Object.assign(new Error('Недостаточно монет'),{status:400});await c.query('UPDATE players SET balance=balance-$2,tap_reward=$3,updated_at=NOW() WHERE telegram_id=$1',[req.playerId,u.cost,u.tap]);await c.query('INSERT INTO player_upgrades(telegram_id,upgrade_id) VALUES($1,$2)',[req.playerId,u.id]);return getState(c,req.playerId,false)});res.json(state)}catch(e){next(e)}});
app.post('/api/game/buy-asset',auth,async(req,res,next)=>{try{const a=ALL_ASSETS.find(x=>x.id===req.body?.assetId);if(!a)throw Object.assign(new Error('Неизвестный актив'),{status:400});const state=await transaction(async c=>{const s=await getState(c,req.playerId);if(s.owned.includes(a.id))throw Object.assign(new Error('Актив уже куплен'),{status:409});if(s.player.balance<a.cost)throw Object.assign(new Error('Недостаточно монет'),{status:400});await c.query('UPDATE players SET balance=balance-$2,updated_at=NOW() WHERE telegram_id=$1',[req.playerId,a.cost]);await c.query('INSERT INTO player_assets(telegram_id,asset_id) VALUES($1,$2)',[req.playerId,a.id]);return getState(c,req.playerId,false)});res.json(state)}catch(e){next(e)}});
app.post('/api/game/sell-asset',auth,async(req,res,next)=>{try{const a=ALL_ASSETS.find(x=>x.id===req.body?.assetId);if(!a)throw Object.assign(new Error('Неизвестный актив'),{status:400});const state=await transaction(async c=>{const s=await getState(c,req.playerId);const row=(await c.query('SELECT level FROM player_assets WHERE telegram_id=$1 AND asset_id=$2 FOR UPDATE',[req.playerId,a.id])).rows[0];if(!row)throw Object.assign(new Error('Этот актив не принадлежит тебе'),{status:400});const resale=Math.floor(a.cost*0.7);await c.query('DELETE FROM player_assets WHERE telegram_id=$1 AND asset_id=$2',[req.playerId,a.id]);await c.query('UPDATE players SET balance=balance+$2,updated_at=NOW() WHERE telegram_id=$1',[req.playerId,resale]);return getState(c,req.playerId,false)});res.json(state)}catch(e){next(e)}});
app.post('/api/game/upgrade-asset',auth,async(req,res,next)=>{try{const a=ALL_ASSETS.find(x=>x.id===req.body?.assetId);if(!a)throw Object.assign(new Error('Неизвестный актив'),{status:400});const state=await transaction(async c=>{const s=await getState(c,req.playerId);const row=(await c.query('SELECT level FROM player_assets WHERE telegram_id=$1 AND asset_id=$2 FOR UPDATE',[req.playerId,a.id])).rows[0];if(!row)throw Object.assign(new Error('Сначала купи этот актив'),{status:400});const fee=Math.max(1000,Math.floor(a.cost*.2));if(row.level>=5)throw Object.assign(new Error('Достигнут максимальный уровень'),{status:400});if(s.player.balance<fee)throw Object.assign(new Error('Недостаточно монет'),{status:400});await c.query('UPDATE players SET balance=balance-$2,updated_at=NOW() WHERE telegram_id=$1',[req.playerId,fee]);await c.query('UPDATE player_assets SET level=level+1 WHERE telegram_id=$1 AND asset_id=$2',[req.playerId,a.id]);return getState(c,req.playerId,false)});res.json(state)}catch(e){next(e)}});
app.get('/api/leaderboard',auth,async(req,res,next)=>{try{const r=await pool.query('SELECT first_name,username,balance FROM players ORDER BY balance DESC LIMIT 20');res.json({players:r.rows.map((x,i)=>({rank:i+1,name:x.username?`@${x.username}`:x.first_name,balance:Number(x.balance)}))})}catch(e){next(e)}});

// Админ-доступ проверяется только на сервере по Telegram ID из переменной окружения.
function requireAdmin(req,res,next) {
  const adminId=process.env.ADMIN_TELEGRAM_ID;
  if(!adminId || !/^\d+$/.test(adminId) || String(req.playerId)!==adminId) {
    return res.status(403).json({error:'Доступ запрещён'});
  }
  next();
}
app.get('/api/admin/me',auth,(req,res)=>{
  const adminId=process.env.ADMIN_TELEGRAM_ID;
  res.json({isAdmin:!!adminId && /^\d+$/.test(adminId) && String(req.playerId)===adminId});
});
app.post('/api/admin/credit',auth,requireAdmin,async(req,res,next)=>{
  try {
    const targetId=String(req.body?.telegramId||'').trim();
    const amount=Number(req.body?.amount);
    if(!/^\d{5,20}$/.test(targetId) || !Number.isSafeInteger(amount) || amount<1 || amount>1000000000) {
      throw Object.assign(new Error('Укажи корректный Telegram ID и сумму от 1 до 1 000 000 000 игровых рублей'),{status:400});
    }
    const result=await transaction(async c=>{
      const updated=await c.query('UPDATE players SET balance=balance+$2,updated_at=NOW() WHERE telegram_id=$1 RETURNING balance',[targetId,amount]);
      if(!updated.rowCount) throw Object.assign(new Error('Игрок не найден. Он должен хотя бы один раз открыть приложение.'),{status:404});
      await c.query('INSERT INTO admin_balance_audit(admin_id,target_id,amount) VALUES($1,$2,$3)',[req.playerId,targetId,amount]);
      return Number(updated.rows[0].balance);
    });
    res.json({ok:true,balance:result,credited:amount});
  } catch(e) { next(e); }
});
app.get('/health',async(req,res)=>{try{await pool.query('SELECT 1');res.json({ok:true})}catch{res.status(503).json({ok:false})}});
const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
app.use(express.static(root,{index:'index.html',maxAge:process.env.NODE_ENV==='production'?'1h':0}));
app.use((err,req,res,next)=>{req.log?.error(err);res.status(err.status||500).json({error:err.status?err.message:'Внутренняя ошибка сервера'});});
const server=app.listen(PORT,()=>console.log(`CRYPTO INVESTOR listening on ${PORT}`));
async function shutdown(){server.close(()=>{});await pool.end();if(redis)await redis.quit();process.exit(0)} process.on('SIGTERM',shutdown);process.on('SIGINT',shutdown);
