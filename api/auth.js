// /api/auth.js
import crypto from 'crypto';

const ADMIN_EMAIL = 'admin@tlink.app';
let SESSIONS = {}; // In-memory session store

export default async function handler(req) {
  if (req.method !== 'POST') return new Response('Method Not Allowed', { status: 405 });

  try {
    const body = await req.json();
    const { email } = body;

    const role = email === ADMIN_EMAIL ? 'admin' : 'user';
    const coins = role === 'admin' ? Number.MAX_SAFE_INTEGER : 100;

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
