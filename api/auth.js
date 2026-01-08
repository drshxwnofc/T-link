import crypto from 'crypto';

const ADMIN_EMAIL = "admin@tlink.app";

export default async (req, res) => {
  const { email } = JSON.parse(req.body);

  const role = email === ADMIN_EMAIL ? 'admin' : 'user';
  const coins = role === 'admin' ? Number.MAX_SAFE_INTEGER : 100;

  res.json({
    token: crypto.randomUUID(),
    role,
    coins
  });
};
