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
const bansReady = Promise.all([pool.query(`CREATE TABLE IF NOT EXISTS player_account_bans (telegram_id TEXT PRIMARY KEY, banned_by TEXT NOT NULL, reason TEXT, expires_at TIMESTAMPTZ, created_at TIMESTAMPTZ NOT NULL DEFAULT NOW())`),pool.query(`CREATE TABLE IF NOT EXISTS player_guess_number_claims (telegram_id TEXT PRIMARY KEY, last_play_at TIMESTAMPTZ NOT NULL DEFAULT NOW())`)]);
const redis = process.env.REDIS_URL ? new Redis(process.env.REDIS_URL, { maxRetriesPerRequest: 2, enableReadyCheck: true }) : null;
const PORT = Number(process.env.PORT || 3000);
const BOT_TOKEN = process.env.BOT_TOKEN;
const TELEGRAM_WEBHOOK_SECRET = process.env.TELEGRAM_WEBHOOK_SECRET;
const PUBLIC_URL = process.env.PUBLIC_URL || 'https://crypto-investor-72f3.onrender.com';
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
async function auth(req,res,next) {
  try {
    const token = (req.headers.authorization || '').replace(/^Bearer\s+/i,''); const [payload,sig] = token.split('.');
    if (!payload || !sig) throw new Error('Требуется авторизация');
    const expected = createHmac('sha256',TOKEN_SECRET).update(payload).digest(); const actual=Buffer.from(sig,'base64url');
    if (expected.length!==actual.length || !timingSafeEqual(expected,actual)) throw new Error('Недействительная сессия');
    const data=JSON.parse(Buffer.from(payload,'base64url').toString()); if (!data.sub || data.exp<Date.now()) throw new Error('Сессия истекла');
    await bansReady;
    const ban = await pool.query('SELECT expires_at FROM player_account_bans WHERE telegram_id=$1 AND (expires_at IS NULL OR expires_at>NOW())',[String(data.sub)]);
    if (ban.rowCount) return res.status(403).json({error:ban.rows[0].expires_at ? 'Аккаунт заблокирован до '+new Date(ban.rows[0].expires_at).toLocaleString('ru-RU')+'.' : 'Аккаунт заблокирован навсегда.'});
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
  await bansReady;
  const ban=await pool.query('SELECT expires_at FROM player_account_bans WHERE telegram_id=$1 AND (expires_at IS NULL OR expires_at>NOW())',[user.id]);
  if(ban.rowCount) throw Object.assign(new Error(ban.rows[0].expires_at ? 'Аккаунт заблокирован до '+new Date(ban.rows[0].expires_at).toLocaleString('ru-RU')+'.' : 'Аккаунт заблокирован навсегда.'),{status:403});
  await pool.query(`INSERT INTO players(telegram_id,username,first_name,balance) VALUES($1,$2,$3,100000) ON CONFLICT(telegram_id) DO UPDATE SET username=EXCLUDED.username,first_name=EXCLUDED.first_name,updated_at=NOW()`,[user.id,user.username,user.firstName]);
  await pool.query(`UPDATE players SET tap_reward=300 WHERE telegram_id=$1 AND tap_reward=50 AND NOT EXISTS (SELECT 1 FROM player_upgrades WHERE telegram_id=$1)`,[user.id]);
  res.json({ token:makeSession(user) });
 } catch(e){next(Object.assign(e,{status:401}));} });
app.get('/api/game/state',auth,async(req,res,next)=>{try{const state=await transaction(c=>getState(c,req.playerId));res.json(state);}catch(e){next(e)}});
function levelForTaps(taps){
 let level=1,nextThreshold=100,step=150,total=0;
 while(level<999&&taps>=nextThreshold){total=nextThreshold;level++;nextThreshold+=step;step+=50;}
 return {level,progress:Math.max(0,taps-total),needed:100+(level-1)*50};
}
app.post('/api/game/tap',auth,async(req,res,next)=>{try{
 const count=Number(req.body?.count??1);
 if(!Number.isSafeInteger(count)||count<1||count>1000)throw Object.assign(new Error('Некорректное количество тапов.'),{status:400});
 const state=await transaction(async c=>{
  const s=await getState(c,req.playerId);
  const oldTaps=Number(s.player.taps||0),oldLevel=levelForTaps(oldTaps).level;
  const result=await c.query('UPDATE players SET taps=taps+$2,balance=balance+tap_reward*$2+((FLOOR((taps+$2)::numeric/100)-FLOOR(taps::numeric/100))*500),updated_at=NOW() WHERE telegram_id=$1 RETURNING balance,taps,tap_reward',[req.playerId,count]);
  const newTaps=Number(result.rows[0].taps),newLevel=levelForTaps(newTaps).level;
  const levelReward=Math.max(0,newLevel-oldLevel)*25000;
  if(levelReward)await c.query('UPDATE players SET balance=balance+$2 WHERE telegram_id=$1',[req.playerId,levelReward]);
  s.player.balance=Number(result.rows[0].balance)+levelReward;
  s.player.taps=newTaps;s.player.tapReward=Number(result.rows[0].tap_reward);
  return {...s,bonus:(Math.floor(newTaps/100)-Math.floor(oldTaps/100))*500,levelReward};
 });
 res.json(state);
 }catch(e){next(e)}});
app.post('/api/game/crossword-reward',auth,async(req,res,next)=>{try{const level=req.body?.level;const answers=req.body?.answers;const easy=new Set(['КОШКА','ЯБЛОКО','ЗИМА','МОРЕ','СОЛНЦЕ','КНИГА','РЫБА','ЛИМОН','ШКОЛА','СНЕГ','ГРИБ','ОКНО']);const medium=new Set(['КОМПАС','ПЛАНЕТА','РАДУГА','ПИРАМИДА','ЛАБИРИНТ','ТЕЛЕСКОП','БИБЛИОТЕКА','ВУЛКАН','МОЛЕКУЛА','ОРБИТА','АРХИПЕЛАГ','ГРАВИТАЦИЯ','ЭКВАТОР','МЕТЕОРИТ','КРИСТАЛЛ']);const allowed=level==='easy'?easy:level==='medium'?medium:null;const expected=level==='easy'?4:5;if(!allowed||!Array.isArray(answers)||answers.length!==expected||answers.some(x=>typeof x!=='string'||!allowed.has(x)))throw Object.assign(new Error('Ответы кроссворда не прошли проверку'),{status:400});const state=await transaction(async c=>{const prev=(await c.query('SELECT last_claim_at FROM player_crossword_claims WHERE telegram_id=$1 FOR UPDATE',[req.playerId])).rows[0];if(prev&&Date.now()-new Date(prev.last_claim_at).getTime()<600000)throw Object.assign(new Error('Следующая награда будет доступна через 10 минут после прошлого кроссворда.'),{status:429});await c.query('UPDATE players SET balance=balance+5000,updated_at=NOW() WHERE telegram_id=$1',[req.playerId]);await c.query('INSERT INTO player_crossword_claims(telegram_id,last_claim_at) VALUES($1,NOW()) ON CONFLICT(telegram_id) DO UPDATE SET last_claim_at=NOW()',[req.playerId]);return getState(c,req.playerId,false)});res.json(state);}catch(e){next(e)}});
app.post('/api/game/guess-number',auth,async(req,res,next)=>{try{
 const guess=Number(req.body?.guess);
 if(!Number.isInteger(guess)||guess<1||guess>5)throw Object.assign(new Error('Выбери целое число от 1 до 5.'),{status:400});
 const result=await transaction(async c=>{
  await getState(c,req.playerId,false);
  const previous=(await c.query('SELECT last_play_at FROM player_guess_number_claims WHERE telegram_id=$1 FOR UPDATE',[req.playerId])).rows[0];
  if(previous){
   const waitMs=600000-(Date.now()-new Date(previous.last_play_at).getTime());
   if(waitMs>0)throw Object.assign(new Error('Следующий раунд будет доступен через '+Math.ceil(waitMs/60000)+' мин.'),{status:429});
  }
  const number=1+Math.floor(Math.random()*5);
  const correct=guess===number;
  if(correct)await c.query('UPDATE players SET balance=balance+10000,updated_at=NOW() WHERE telegram_id=$1',[req.playerId]);
  await c.query('INSERT INTO player_guess_number_claims(telegram_id,last_play_at) VALUES($1,NOW()) ON CONFLICT(telegram_id) DO UPDATE SET last_play_at=NOW()',[req.playerId]);
  return {state:await getState(c,req.playerId,false),number,correct,reward:correct?10000:0};
 });
 res.json(result);
 }catch(e){next(e)}});
app.post('/api/game/transfer',auth,async(req,res,next)=>{try{const username=String(req.body?.username||'').replace(/^@/,'').trim();const amount=Number(req.body?.amount);if(!/^[A-Za-z0-9_]{5,32}$/.test(username)||!Number.isSafeInteger(amount)||amount<1||amount>1000000000)throw Object.assign(new Error('Проверь username и сумму перевода'),{status:400});const result=await transaction(async c=>{const recipient=(await c.query('SELECT telegram_id,username FROM players WHERE lower(username)=lower($1)',[username])).rows[0];if(!recipient)throw Object.assign(new Error('Игрок с таким username не найден. Он должен хотя бы один раз открыть приложение.'),{status:404});if(String(recipient.telegram_id)===String(req.playerId))throw Object.assign(new Error('Нельзя переводить самому себе'),{status:400});const debit=await c.query('UPDATE players SET balance=balance-$2,updated_at=NOW() WHERE telegram_id=$1 AND balance >= $2 RETURNING balance',[req.playerId,amount]);if(!debit.rowCount)throw Object.assign(new Error('Недостаточно средств'),{status:400});await c.query('UPDATE players SET balance=balance+$2,updated_at=NOW() WHERE telegram_id=$1',[recipient.telegram_id,amount]);await c.query('INSERT INTO player_transfers(sender_id,recipient_id,amount) VALUES($1,$2,$3)',[req.playerId,recipient.telegram_id,amount]);const state=await getState(c,req.playerId,false);return {state,recipient:recipient.username||username};});res.json(result);}catch(e){next(e)}});
app.post('/api/game/buy-upgrade',auth,async(req,res,next)=>{try{
 const {upgradeId}=req.body||{};
 const u=UPGRADES.find(x=>x.id===upgradeId);
 if(!u)throw Object.assign(new Error('Неизвестный апгрейд'),{status:400});
 const state=await transaction(async c=>{
  const s=await getState(c,req.playerId);
  if(s.purchasedUpgrades.includes(u.id))throw Object.assign(new Error('Апгрейд уже куплен'),{status:409});
  if(s.player.balance<u.cost)throw Object.assign(new Error('Недостаточно монет'),{status:400});
  const debit=await c.query(
   'UPDATE players SET balance=balance-$2,tap_reward=$3,updated_at=NOW() WHERE telegram_id=$1 AND balance >= $2 RETURNING balance,tap_reward',
   [req.playerId,u.cost,u.tap]
  );
  if(!debit.rowCount)throw Object.assign(new Error('Недостаточно монет'),{status:400});
  await c.query('INSERT INTO player_upgrades(telegram_id,upgrade_id) VALUES($1,$2)',[req.playerId,u.id]);
  const updated=await getState(c,req.playerId,false);
  updated.player.balance=Number(debit.rows[0].balance);
  updated.player.tapReward=Number(debit.rows[0].tap_reward);
  return updated;
 });
 res.json(state);
 }catch(e){next(e)} });
app.post('/api/game/buy-asset',auth,async(req,res,next)=>{try{const a=ALL_ASSETS.find(x=>x.id===req.body?.assetId);if(!a)throw Object.assign(new Error('Неизвестный актив'),{status:400});const state=await transaction(async c=>{const s=await getState(c,req.playerId);if(s.owned.includes(a.id))throw Object.assign(new Error('Актив уже куплен'),{status:409});if(s.player.balance<a.cost)throw Object.assign(new Error('Недостаточно монет'),{status:400});await c.query('UPDATE players SET balance=balance-$2,updated_at=NOW() WHERE telegram_id=$1',[req.playerId,a.cost]);await c.query('INSERT INTO player_assets(telegram_id,asset_id) VALUES($1,$2)',[req.playerId,a.id]);return getState(c,req.playerId,false)});res.json(state)}catch(e){next(e)}});
app.post('/api/game/sell-asset',auth,async(req,res,next)=>{try{const a=ALL_ASSETS.find(x=>x.id===req.body?.assetId);if(!a)throw Object.assign(new Error('Неизвестный актив'),{status:400});const state=await transaction(async c=>{const s=await getState(c,req.playerId);const row=(await c.query('SELECT level FROM player_assets WHERE telegram_id=$1 AND asset_id=$2 FOR UPDATE',[req.playerId,a.id])).rows[0];if(!row)throw Object.assign(new Error('Этот актив не принадлежит тебе'),{status:400});const resale=Math.floor(a.cost*0.7);await c.query('DELETE FROM player_assets WHERE telegram_id=$1 AND asset_id=$2',[req.playerId,a.id]);await c.query('UPDATE players SET balance=balance+$2,updated_at=NOW() WHERE telegram_id=$1',[req.playerId,resale]);return getState(c,req.playerId,false)});res.json(state)}catch(e){next(e)}});
app.post('/api/game/upgrade-asset',auth,async(req,res,next)=>{try{const a=ALL_ASSETS.find(x=>x.id===req.body?.assetId);if(!a)throw Object.assign(new Error('Неизвестный актив'),{status:400});const state=await transaction(async c=>{const s=await getState(c,req.playerId);const row=(await c.query('SELECT level FROM player_assets WHERE telegram_id=$1 AND asset_id=$2 FOR UPDATE',[req.playerId,a.id])).rows[0];if(!row)throw Object.assign(new Error('Сначала купи этот актив'),{status:400});const fee=Math.max(1000,Math.floor(a.cost*.2));if(row.level>=5)throw Object.assign(new Error('Достигнут максимальный уровень'),{status:400});if(s.player.balance<fee)throw Object.assign(new Error('Недостаточно монет'),{status:400});await c.query('UPDATE players SET balance=balance-$2,updated_at=NOW() WHERE telegram_id=$1',[req.playerId,fee]);await c.query('UPDATE player_assets SET level=level+1 WHERE telegram_id=$1 AND asset_id=$2',[req.playerId,a.id]);return getState(c,req.playerId,false)});res.json(state)}catch(e){next(e)}});
app.get('/api/leaderboard',auth,async(req,res,next)=>{try{
 const type=req.query.type==='assets'?'assets':'balance';
 if(type==='assets'){
  const r=await pool.query(`SELECT p.telegram_id,p.username,p.first_name,pa.asset_id
   FROM players p LEFT JOIN player_assets pa ON pa.telegram_id=p.telegram_id`);
  const values=new Map(ALL_ASSETS.map(a=>[a.id,Number(a.cost)||0]));
  const totals=new Map();
  for(const row of r.rows){
   const id=String(row.telegram_id);
   if(!totals.has(id)) totals.set(id,{username:row.username,first_name:row.first_name,assetsValue:0});
   if(row.asset_id) totals.get(id).assetsValue+=values.get(row.asset_id)||0;
  }
  const players=[...totals.values()].filter(x=>x.assetsValue>0).sort((a,b)=>b.assetsValue-a.assetsValue)
   .slice(0,100).map((x,i)=>({rank:i+1,name:x.username?`@${x.username}`:x.first_name||'Игрок',assetsValue:x.assetsValue}));
  return res.json({type:'assets',players});
 }
 const r=await pool.query(`SELECT username,first_name,balance FROM players
  WHERE balance > 0 ORDER BY balance DESC,telegram_id ASC LIMIT 100`);
 res.json({type:'balance',players:r.rows.map((x,i)=>({rank:i+1,name:x.username?`@${x.username}`:x.first_name||'Игрок',balance:Number(x.balance)}))});
}catch(e){next(e)} });

// // Владелец имеет полный доступ. Дополнительный администратор может начислять
// игровые рубли только своему Telegram-аккаунту.
const SELF_ADMIN_IDS = new Set(['7156176578']);
function getAdminRole(playerId) {
  const ownerId = String(process.env.ADMIN_TELEGRAM_ID || '');
  if (/^\d+$/.test(ownerId) && String(playerId) === ownerId) return 'owner';
  if (SELF_ADMIN_IDS.has(String(playerId))) return 'self';
  return null;
}
function requireAdmin(req,res,next) {
  const role = getAdminRole(req.playerId);
  if (!role) return res.status(403).json({error:'Доступ запрещён'});
  req.adminRole = role;
  next();
}
app.get('/api/admin/me',auth,async(req,res,next)=>{
  try {
    const role = getAdminRole(req.playerId);
    if (!role) return res.json({isAdmin:false});
    const player = (await pool.query('SELECT telegram_id,username,first_name,balance FROM players WHERE telegram_id=$1',[req.playerId])).rows[0];
    if (!player) return res.status(404).json({error:'Сначала открой игру в Telegram, чтобы создать профиль.'});
    res.json({isAdmin:true,role,telegramId:String(player.telegram_id),username:player.username,firstName:player.first_name,balance:Number(player.balance)});
  } catch(e) { next(e); }
});
app.post('/api/admin/credit',auth,requireAdmin,async(req,res,next)=>{
  try {
    const targetId=req.adminRole==='self' ? String(req.playerId) : String(req.body?.telegramId||'').trim();
    const amount=Number(req.body?.amount);
    if (req.adminRole==='self' && req.body?.telegramId && String(req.body.telegramId)!==String(req.playerId)) {
      throw Object.assign(new Error('Этот администратор может начислять игровые рубли только себе.'),{status:403});
    }
    if (!/^\d{5,20}$/.test(targetId) || !Number.isSafeInteger(amount) || amount<1 || amount>1000000000) {
      throw Object.assign(new Error('Укажи корректную сумму от 1 до 1 000 000 000 игровых рублей'),{status:400});
    }
    const result=await transaction(async c=>{
      const updated=await c.query('UPDATE players SET balance=balance+$2,updated_at=NOW() WHERE telegram_id=$1 RETURNING balance',[targetId,amount]);
      if(!updated.rowCount) throw Object.assign(new Error('Игрок не найден. Сначала открой игру в Telegram.'),{status:404});
      await c.query('INSERT INTO admin_balance_audit(admin_id,target_id,amount) VALUES($1,$2,$3)',[req.playerId,targetId,amount]);
      return Number(updated.rows[0].balance);
    });
    res.json({ok:true,balance:result,credited:amount});
  } catch(e) { next(e); }
});

// Команды управления аккаунтами доступны только главному администратору.
function findAdminTarget(client, username) {
  const clean = String(username || '').replace(/^@/, '').trim();
  if (!/^[A-Za-z0-9_]{5,32}$/.test(clean)) throw Object.assign(new Error('Укажи корректный @username игрока.'),{status:400});
  return client.query('SELECT telegram_id,username,first_name FROM players WHERE lower(username)=lower($1) FOR UPDATE',[clean]);
}
function parseBanDuration(value) {
  if (/^(навсегда|forever|permanent)$/i.test(value || '')) return null;
  const match = String(value || '').match(/^(\d{1,4})(m|h|d|w)$/i);
  if (!match) throw Object.assign(new Error('Укажи срок: 30m, 12h, 7d, 2w или «навсегда».'),{status:400});
  const amount = Number(match[1]);
  const multiplier = {m:60000,h:3600000,d:86400000,w:604800000}[match[2].toLowerCase()];
  const ms = amount * multiplier;
  if (!Number.isSafeInteger(ms) || ms < 60000 || ms > 365*86400000) throw Object.assign(new Error('Временная блокировка должна быть от 1 минуты до 365 дней.'),{status:400});
  return new Date(Date.now()+ms);
}

// Команды бота: владелец может работать с любым игроком, self-admin — только со своим аккаунтом.
async function sendBotMessage(chatId, text, replyMarkup = null) {
  const response = await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
    method: 'POST', headers: {'content-type':'application/json'},
    body: JSON.stringify({chat_id:chatId,text,...(replyMarkup ? {reply_markup:replyMarkup} : {})})
  });
  if (!response.ok) throw new Error('Telegram sendMessage failed');
}
app.post('/api/telegram/webhook', async (req,res) => {
  if (!TELEGRAM_WEBHOOK_SECRET || req.get('x-telegram-bot-api-secret-token') !== TELEGRAM_WEBHOOK_SECRET) {
    return res.sendStatus(401);
  }
  res.sendStatus(200);
  try {
    const message = req.body?.message;
    const text = String(message?.text || '').trim();
    const senderId = String(message?.from?.id || '');
    const chatId = message?.chat?.id;
    if (!text || !chatId) return;
    // /start must be available to every player and launch the app as a Telegram Mini App.
    if (/^\/start(?:\s|$)/i.test(text)) {
      const appUrl = PUBLIC_URL.replace(/\/+$/, '');
      await sendBotMessage(chatId, 'Нажми кнопку «Играть», чтобы открыть актуальную версию CRYPTO INVESTOR.', {
        inline_keyboard: [[{ text: '🎮 Играть', web_app: { url: appUrl } }]]
      });
      return;
    }
    const adminRole = getAdminRole(senderId);
    if (!adminRole) {
      await sendBotMessage(chatId, 'У тебя нет доступа к командам администратора.');
      return;
    }
    const give = text.match(/^\/give(?:@\w+)?\s+(@?[A-Za-z0-9_]{5,32}|\d{5,20})\s+(\d{1,10})$/i);
    const balance = text.match(/^\/balance(?:@\w+)?\s+(@?[A-Za-z0-9_]{5,32}|\d{5,20})$/i);
    if (give) {
      const target = give[1].replace(/^@/, '');
      const amount = Number(give[2]);
      if (!Number.isSafeInteger(amount) || amount < 1 || amount > 1000000000) {
        await sendBotMessage(chatId, 'Сумма должна быть от 1 до 1 000 000 000 игровых рублей.');
        return;
      }
      const result = await transaction(async c => {
        const byId = /^\d{5,20}$/.test(target);
        const matches = byId
          ? await c.query('SELECT telegram_id, username FROM players WHERE telegram_id=$1 FOR UPDATE', [target])
          : await c.query('SELECT telegram_id, username FROM players WHERE lower(username)=lower($1) FOR UPDATE', [target]);
        if (matches.rowCount === 0) return {error:'Игрок не найден. Пусть он хотя бы один раз откроет игру в Telegram.'};
        if (matches.rowCount > 1) return {error:'Найдено несколько совпадений. Используй Telegram ID.'};
        const targetId = String(matches.rows[0].telegram_id);
        if (adminRole === 'self' && targetId !== senderId) return {error:'Тебе разрешено начислять игровые рубли только на свой аккаунт.'};
        const adminExists = await c.query('SELECT 1 FROM players WHERE telegram_id=$1', [senderId]);
        if (!adminExists.rowCount) return {error:'Сначала открой игру CRYPTO INVESTOR со своего Telegram-аккаунта.'};
        const updated = await c.query('UPDATE players SET balance=balance+$2,updated_at=NOW() WHERE telegram_id=$1 RETURNING balance', [targetId, amount]);
        await c.query('INSERT INTO admin_balance_audit(admin_id,target_id,amount) VALUES($1,$2,$3)', [senderId,targetId,amount]);
        return {username:matches.rows[0].username || username,balance:Number(updated.rows[0].balance)};
      });
      await sendBotMessage(chatId, result.error || `Готово! @${result.username} начислено ${amount.toLocaleString('ru-RU')} игровых рублей. Новый баланс: ${result.balance.toLocaleString('ru-RU')} ₽.`);
      return;
    }
    if (balance) {
      const target = balance[1].replace(/^@/, '');
      const byId = /^\d{5,20}$/.test(target);
      const matches = byId
        ? await pool.query('SELECT telegram_id,username,balance FROM players WHERE telegram_id=$1', [target])
        : await pool.query('SELECT telegram_id,username,balance FROM players WHERE lower(username)=lower($1)', [target]);
      if (matches.rowCount !== 1) {
        await sendBotMessage(chatId, matches.rowCount ? 'Найдено несколько совпадений.' : 'Игрок не найден. Он должен хотя бы раз открыть игру.');
        return;
      }
      if (adminRole === 'self' && String(matches.rows[0].telegram_id) !== senderId) {
        await sendBotMessage(chatId, 'Тебе разрешено смотреть только собственный баланс.');
        return;
      }
      await sendBotMessage(chatId, `Баланс ${matches.rows[0].username ? '@'+matches.rows[0].username : 'игрока'}: ${Number(matches.rows[0].balance).toLocaleString('ru-RU')} игровых рублей.`);
      return;
    }
    const resetBalance = text.match(/^\/resetbalance(?:@\w+)?\s+@?([A-Za-z0-9_]{5,32})$/i);
    const ban = text.match(/^\/ban(?:@\w+)?\s+@?([A-Za-z0-9_]{5,32})\s+(навсегда|forever|permanent|\d{1,4}[mhdw])(?:\s+(.+))?$/i);
    const unban = text.match(/^\/unban(?:@\w+)?\s+@?([A-Za-z0-9_]{5,32})$/i);
    const resetAllProgress = /^\/resetallprogress(?:@\w+)?$/i.test(text);
    if (resetAllProgress) {
      if (adminRole !== 'owner') {
        await sendBotMessage(chatId, 'Полный сброс доступен только главному администратору.');
        return;
      }
      const result = await transaction(async c => {
        const assets = await c.query('DELETE FROM player_assets');
        const upgrades = await c.query('DELETE FROM player_upgrades');
        const claims = await c.query('DELETE FROM player_crossword_claims');
        const players = await c.query(
          'UPDATE players SET balance=0,taps=0,tap_reward=300,last_income_at=NOW(),updated_at=NOW() RETURNING telegram_id'
        );
        return {
          players: players.rowCount,
          assets: assets.rowCount,
          upgrades: upgrades.rowCount,
          claims: claims.rowCount
        };
      });
      await sendBotMessage(chatId,
        'Полный сброс выполнен. Аккаунты и авторизация сохранены.\\n' +
        'Игроков сброшено: ' + result.players + '.\\n' +
        'Удалено активов: ' + result.assets + '.\\n' +
        'Сброшено улучшений: ' + result.upgrades + '.\\n' +
        'Сброшено отметок кроссворда: ' + result.claims + '.\\n' +
        'Баланс: 0 ₽, тап: 300 ₽, прогресс уровней: 0.'
      );
      return;
    }
    if (resetBalance || ban || unban) {
      if (adminRole !== 'owner') {
        await sendBotMessage(chatId, 'Эта команда доступна только главному администратору.');
        return;
      }
      if (resetBalance) {
        const result = await transaction(async c => {
          const matches = await findAdminTarget(c, resetBalance[1]);
          if (matches.rowCount !== 1) return {error:matches.rowCount ? 'Найдено несколько совпадений. Уточни username.' : 'Игрок не найден.'};
          const target = matches.rows[0];
          if (String(target.telegram_id) === senderId) return {error:'Нельзя обнулить баланс главного администратора.'};
          await c.query('UPDATE players SET balance=0,last_income_at=NOW(),updated_at=NOW() WHERE telegram_id=$1',[target.telegram_id]);
          return {name:target.username ? '@'+target.username : target.first_name || 'Игрок'};
        });
        await sendBotMessage(chatId, result.error || ('Баланс игрока '+result.name+' обнулён.'));
        return;
      }
      if (ban) {
        const expiresAt = parseBanDuration(ban[2]);
        const result = await transaction(async c => {
          const matches = await findAdminTarget(c, ban[1]);
          if (matches.rowCount !== 1) return {error:matches.rowCount ? 'Найдено несколько совпадений. Уточни username.' : 'Игрок не найден.'};
          const target = matches.rows[0];
          if (String(target.telegram_id) === senderId || String(target.telegram_id) === String(process.env.ADMIN_TELEGRAM_ID)) return {error:'Нельзя заблокировать главный аккаунт.'};
          await c.query('INSERT INTO player_account_bans(telegram_id,banned_by,reason,expires_at) VALUES($1,$2,$3,$4) ON CONFLICT(telegram_id) DO UPDATE SET banned_by=EXCLUDED.banned_by,reason=EXCLUDED.reason,expires_at=EXCLUDED.expires_at,created_at=NOW()',
            [String(target.telegram_id),senderId,ban[3] || null,expiresAt]);
          return {name:target.username ? '@'+target.username : target.first_name || 'Игрок'};
        });
        const durationText = expiresAt ? 'до '+expiresAt.toLocaleString('ru-RU') : 'навсегда';
        await sendBotMessage(chatId, result.error || ('Аккаунт '+result.name+' заблокирован '+durationText+'.'));
        return;
      }
      if (unban) {
        const result = await transaction(async c => {
          const matches = await findAdminTarget(c, unban[1]);
          if (matches.rowCount !== 1) return {error:matches.rowCount ? 'Найдено несколько совпадений. Уточни username.' : 'Игрок не найден.'};
          const target = matches.rows[0];
          const deleted = await c.query('DELETE FROM player_account_bans WHERE telegram_id=$1',[String(target.telegram_id)]);
          return {name:target.username ? '@'+target.username : target.first_name || 'Игрок',wasBanned:deleted.rowCount>0};
        });
        await sendBotMessage(chatId, result.error || (result.wasBanned ? 'Блокировка аккаунта '+result.name+' снята.' : 'У аккаунта '+result.name+' не было активной блокировки.'));
        return;
      }
    }
    if (/^\/(give|balance)(?:@\w+)?(?:\s|$)/i.test(text)) {
      await sendBotMessage(chatId, 'Команды администратора:\n/give @username сумма — начислить игровые рубли\n/give Telegram_ID сумма — начислить по ID\n/balance @username или /balance Telegram_ID — посмотреть баланс\n/resetbalance @username — обнулить баланс\n/ban @username 7d — блокировка на срок (30m, 12h, 7d, 2w)\n/ban @username навсегда — постоянная блокировка\n/unban @username — снять блокировку');
      return;
    }
    if (/^\/help(?:\s|$)/i.test(text)) {
      await sendBotMessage(chatId, 'Команды администратора:\n/give @username сумма — начислить игровые рубли\n/give Telegram_ID сумма — начислить по ID\n/balance @username или /balance Telegram_ID — посмотреть баланс\n/resetbalance @username — обнулить баланс\n/ban @username 7d — блокировка на срок (30m, 12h, 7d, 2w)\n/ban @username навсегда — постоянная блокировка\n/unban @username — снять блокировку');
    }
  } catch (error) {
    req.log?.error(error);
    try { await sendBotMessage(chatId, 'Не удалось выполнить команду. Проверь, что игрок уже заходил в игру.'); } catch {}
  }
});

app.get('/health',async(req,res)=>{try{await pool.query('SELECT 1');res.json({ok:true})}catch{res.status(503).json({ok:false})}});
const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
app.use(express.static(root,{
  index:'index.html',
  maxAge:0,
  setHeaders(res){
    // Telegram's in-app browser must fetch the current HTML, JS and CSS after deploys.
    res.setHeader('Cache-Control','no-store, no-cache, must-revalidate, proxy-revalidate');
    res.setHeader('Pragma','no-cache');
    res.setHeader('Expires','0');
  }
}));
app.use((err,req,res,next)=>{req.log?.error(err);res.status(err.status||500).json({error:err.status?err.message:'Внутренняя ошибка сервера'});});
const server=app.listen(PORT,()=>console.log(`CRYPTO INVESTOR listening on ${PORT}`));
if (TELEGRAM_WEBHOOK_SECRET) {
  fetch(`https://api.telegram.org/bot${BOT_TOKEN}/setMyCommands`, {
    method:'POST', headers:{'content-type':'application/json'},
    body:JSON.stringify({commands:[
      {command:'start',description:'Открыть CRYPTO INVESTOR'},
      {command:'give',description:'Начислить игровые рубли'},
      {command:'balance',description:'Посмотреть баланс игрока'},
      {command:'resetbalance',description:'Обнулить баланс игрока (главный админ)'},
      {command:'resetallprogress',description:'Полный сброс прогресса всех игроков'},
      {command:'ban',description:'Заблокировать аккаунт (главный админ)'},
      {command:'unban',description:'Разблокировать аккаунт (главный админ)'},
      {command:'help',description:'Помощь по командам'}
    ]})
  }).then(r=>r.json()).then(data=>console.log('Telegram commands registration:',data.ok?'ok':'failed'))
    .catch(error=>console.error('Telegram commands registration failed:',error.message));
  fetch(`https://api.telegram.org/bot${BOT_TOKEN}/setWebhook`, {
    method:'POST', headers:{'content-type':'application/json'},
    body:JSON.stringify({url:`${PUBLIC_URL}/api/telegram/webhook`,secret_token:TELEGRAM_WEBHOOK_SECRET,allowed_updates:['message']})
  }).then(r=>r.json()).then(data=>console.log('Telegram webhook registration:',data.ok?'ok':'failed'))
    .catch(error=>console.error('Telegram webhook registration failed:',error.message));
}
async function shutdown(){server.close(()=>{});await pool.end();if(redis)await redis.quit();process.exit(0)} process.on('SIGTERM',shutdown);process.on('SIGINT',shutdown);
