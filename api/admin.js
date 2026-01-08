const ADMIN = 'admin@tlink.app';

export default async function handler(req, res) {
  if (req.headers['x-admin'] !== ADMIN) {
    return res.status(403).end();
  }

  res.json({
    users: 'ok',
    apps: 'ok',
    ledger: 'ok'
  });
}
