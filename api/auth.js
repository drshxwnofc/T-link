import crypto from 'crypto';

const ADMIN = 'admin@tlink.app';

export default async function handler(req, res) {
  const { email } = JSON.parse(req.body);

  const token = crypto.randomUUID();
  const role = email === ADMIN ? 'admin' : 'user';

  res.setHeader('Set-Cookie',
    `token=${token}; HttpOnly; Secure; SameSite=Strict`
  );

  res.json({
    token,
    role,
    coins: role === 'admin' ? Number.MAX_SAFE_INTEGER : 100
  });
}
