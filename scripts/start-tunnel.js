/**
 * Túnel com ngrok v3 (@ngrok/ngrok) — compatível com contas ngrok atuais.
 * O @expo/ngrok usa agente 2.x, rejeitado por contas novas (ERR_NGROK_121).
 */
const { spawn } = require('child_process');
const path = require('path');
const fs = require('fs');
const ngrok = require('@ngrok/ngrok');

const ROOT = path.join(__dirname, '..');
const ENV_PATH = path.join(ROOT, '.env');

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

function ensureToken() {
  const env = loadEnv();
  const token = process.env.NGROK_AUTHTOKEN || env.NGROK_AUTHTOKEN;
  if (!token) {
    console.error(`
NGROK_AUTHTOKEN ausente no .env
→ https://dashboard.ngrok.com/get-started/your-authtoken
`);
    process.exit(1);
  }
  return token;
}

async function killPort8081() {
  if (process.platform !== 'win32') return;
  try {
    const { execSync } = require('child_process');
    execSync('powershell -ExecutionPolicy Bypass -File scripts/kill-dev.ps1', {
      cwd: ROOT,
      stdio: 'ignore',
    });
  } catch {
    /* ignore */
  }
}

async function main() {
  const token = ensureToken();
  await killPort8081();

  console.log('Conectando ngrok v3...');
  let listener;
  try {
    listener = await ngrok.forward({
      addr: 8081,
      authtoken: token,
    });
  } catch (err) {
    console.error('\n✗ Falha ao conectar ngrok:\n');
    console.error(' ', err.message || err);
    if (String(err.message || err).includes('121')) {
      console.error('\n  Sua conta exige ngrok 3.x — este script já usa @ngrok/ngrok.');
    }
    console.error('\n  Confira o token em .env e tente novamente.\n');
    process.exit(1);
  }

  const tunnelUrl = listener.url();
  const expUrl = tunnelUrl.replace(/^https?:\/\//, 'exp://');

  console.log('\n✓ Túnel ativo (ngrok v3)!');
  console.log('  HTTPS:', tunnelUrl);
  console.log('  Expo Go:', expUrl);
  console.log('\n→ Compartilhe o link acima com qualquer pessoa.');
  console.log('→ Iniciando Metro...\n');

  const expo = spawn('npx', ['expo', 'start', '--localhost'], {
    cwd: ROOT,
    env: {
      ...process.env,
      NGROK_AUTHTOKEN: token,
      EXPO_PACKAGER_PROXY_URL: tunnelUrl,
    },
    stdio: 'inherit',
    shell: true,
  });

  const cleanup = async () => {
    try {
      await listener.close();
    } catch {
      /* ignore */
    }
    expo.kill('SIGTERM');
  };

  process.on('SIGINT', () => cleanup().then(() => process.exit(0)));
  process.on('SIGTERM', () => cleanup().then(() => process.exit(0)));
  expo.on('exit', (code) => cleanup().then(() => process.exit(code ?? 0)));
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
