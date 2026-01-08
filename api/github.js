export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end();

  const { repo } = JSON.parse(req.body);
  if (!repo.startsWith('https://github.com/')) {
    return res.status(400).json({ error: 'Invalid repo URL' });
  }

  // Metadata-only import (safe)
  const parts = repo.replace('https://github.com/', '').split('/');
  const [owner, name] = parts;

  // In real version, store in DB
  res.json({
    success: true,
    app: {
      name,
      owner,
      status: 'imported'
    }
  });
}
