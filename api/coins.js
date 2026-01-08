import crypto from 'crypto';
import { authenticate } from './utils.js';

let LEDGER = [];

export default async function handler(req) {
  const user = authenticate(req);
  if (!user) return new Response('Unauthorized', { status: 401 });

  if (req.method !== 'POST') return new Response('Method Not Allowed', { status: 405 });

  try {
    const { targetUser, delta, reason } = await req.json();

    if (!targetUser || !reason || Math.abs(delta) > 1000) return new Response('Invalid request', { status: 400 });

    // Only admin can modify other users' coins
    if (user.role !== 'admin' && targetUser !== user.email) {
      return new Response('Forbidden', { status: 403 });
    }

    LEDGER.push({
      id: crypto.randomUUID(),
      by: user.email,
      target: targetUser,
      delta,
      reason,
      time: Date.now()
    });

    return new Response(JSON.stringify({ success: true }), { status: 200, headers: { 'Content-Type': 'application/json' } });

  } catch (err) {
    return new Response('Coins error', { status: 500 });
  }
}
