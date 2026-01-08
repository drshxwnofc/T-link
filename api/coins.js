let LEDGER = [];

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end();

  const { user, delta, reason } = JSON.parse(req.body);

  if (Math.abs(delta) > 1000) {
    return res.status(403).json({ error: 'Coin delta too large' });
  }

  LEDGER.push({
    id: crypto.randomUUID(),
    user,
    delta,
    reason,
    time: Date.now()
  });

  res.json({ success: true });
}
