// /api/coins.js
let LEDGER = [];

export default async function handler(req) {
  if (req.method !== 'POST') return new Response('Method Not Allowed', { status: 405 });

  try {
    const body = await req.json();
    const { user, delta, reason } = body;

    if (!user || !reason || Math.abs(delta) > 1000) {
      return new Response('Invalid request', { status: 400 });
    }

    LEDGER.push({
      id: crypto.randomUUID(),
      user,
      delta,
      reason,
      time: Date.now()
    });

    return new Response(JSON.stringify({ success: true }), { status: 200, headers: { 'Content-Type': 'application/json' } });
  } catch (err) {
    return new Response('Coins error', { status: 500 });
  }
}
