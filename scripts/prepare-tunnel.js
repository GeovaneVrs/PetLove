/**
 * Valida NGROK_AUTHTOKEN antes do túnel (usado pelo npm prestart:tunnel).
 */
const fs = require('fs');
const path = require('path');
const os = require('os');

const ENV_PATH = path.join(__dirname, '..', '.env');

function loadEnv() {
  if (!fs.existsSync(ENV_PATH)) return {};
  const env = {};
  for (const line of fs.readFileSync(ENV_PATH, 'utf8').split('\n')) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('#')) continue;
    const eq = trimmed.indexOf('=');
    if (eq === -1) continue;
    let value = trimmed.slice(eq + 1).trim();
    if (
      (value.startsWith('"') && value.endsWith('"')) ||
      (value.startsWith("'") && value.endsWith("'"))
    ) {
      value = value.slice(1, -1);
    }
    env[trimmed.slice(0, eq).trim()] = value;
  }
  return env;
}

const token = process.env.NGROK_AUTHTOKEN || loadEnv().NGROK_AUTHTOKEN;

if (!token) {
  console.error(`
NGROK_AUTHTOKEN não encontrado no .env
→ https://dashboard.ngrok.com/get-started/your-authtoken
`);
  process.exit(1);
}

const configPath = path.join(os.homedir(), '.expo', 'ngrok.yml');
fs.mkdirSync(path.dirname(configPath), { recursive: true });
fs.writeFileSync(configPath, `authtoken: ${token}\n`, 'utf8');
console.log('✓ Token ngrok configurado');
