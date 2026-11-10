import { randomBytes } from 'node:crypto';
import { copyFile, writeFile, access } from 'node:fs/promises';

const envPath = new URL('../.env', import.meta.url);
const examplePath = new URL('../.env.example', import.meta.url);

try {
  await access(envPath);
  console.error('Файл .env уже существует. Он не изменён, чтобы не перезаписать действующие секреты.');
  process.exit(1);
} catch (error) {
  if (error.code !== 'ENOENT') throw error;
}

const sessionSecret = randomBytes(48).toString('base64url');
const databasePassword = randomBytes(32).toString('base64url');
const botToken = process.env.BOT_TOKEN || 'PASTE_REAL_TOKEN_FROM_BOTFATHER_HERE';

const content = `# Сгенерировано локально. Не публикуйте этот файл и не отправляйте его другим.\nBOT_TOKEN=${botToken}\nSESSION_SECRET=${sessionSecret}\nPOSTGRES_DB=crypto_investor\nPOSTGRES_USER=crypto_app\nPOSTGRES_PASSWORD=${databasePassword}\nDATABASE_URL=postgres://crypto_app:${databasePassword}@localhost:5432/crypto_investor\nREDIS_URL=redis://localhost:6379\nPORT=3000\nPG_POOL_MAX=20\nTRUST_PROXY_HOPS=1\nALLOWED_ORIGINS=\n`;

await writeFile(envPath, content, { flag: 'wx', mode: 0o600 });
console.log('Создан .env с уникальными SESSION_SECRET и POSTGRES_PASSWORD.');
if (botToken === 'PASTE_REAL_TOKEN_FROM_BOTFATHER_HERE') {
  console.log('Не забудьте вставить токен бота от @BotFather в BOT_TOKEN внутри .env.');
} else {
  console.log('BOT_TOKEN взят из переменной окружения BOT_TOKEN.');
}
console.log('Файл имеет права доступа только для владельца (0600). Не публикуйте его в Git и чатах.');
