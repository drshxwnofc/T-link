// /api/signup.js
import crypto from 'crypto';

let USERS = {}; // In-memory store: { email: { passwordHash, coins, role } }

export default async function handler(req) {
  if(req.method !== 'POST') return new Response('Method Not Allowed', { status: 405 });

  try {
    const { email, password } = await req.json();
    if(!email || !password) return new Response('Email & password required', { status: 400 });
    if(USERS[email]) return new Response('User already exists', { status: 400 });

    const passwordHash = crypto.createHash('sha256').update(password).digest('hex');
    USERS[email] = { passwordHash, role: 'user', coins: 100 };

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });

  } catch(e) {
    return new Response('Sign up error', { status: 500 });
  }
}
