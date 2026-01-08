// /api/auth.js
import crypto from 'crypto';

const ADMIN_EMAIL = 'admin@tlink.app';
// SHA-256 hash of "@Mukudzei2022#"
const ADMIN_PASSWORD_HASH = '79e70b207df1cb02859fbeeb238b0854a5e0e72d41a0a107e1f30f6b1c3a103f';

// Simple in-memory session store
let SESSIONS = {};

function hashPassword(password) {
  return crypto.createHash('sha256').update(password).digest('hex');
}

export default async function handler(req) {
  if (req.method !== 'POST') return new Response('Method Not Allowed', { status: 405 });

  try {
    const { email, password } = await req.json();
    if (!email) return new Response('Email required', { status: 400 });

    let role = 'user';
    let coins = 100;

    // ADMIN LOGIN CHECK
    if (email === ADMIN_EMAIL) {
      if (!password) return new Response('Password required', { status: 400 });
      const hashed = hashPassword(password);
      if (hashed !== ADMIN_PASSWORD_HASH) {
        return new Response('Invalid password', { status: 403 });
      }
      role = 'admin';
      coins = Number.MAX_SAFE_INTEGER; // infinite coins
    }

    const token = crypto.randomUUID();
    SESSIONS[token] = { email, role, coins, createdAt: Date.now() };

    return new Response(JSON.stringify({ token, role, coins }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });

  } catch (err) {
    return new Response('Auth error', { status: 500 });
  }
  }
