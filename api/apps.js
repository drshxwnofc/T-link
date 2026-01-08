let APPS = [];

export default async function handler(req, res) {
  if (req.method === 'GET') return res.json(APPS);

  if (req.method === 'POST') {
    const { name, code } = JSON.parse(req.body);
    APPS.push({
      id: crypto.randomUUID(),
      name,
      code,
      status: 'ready'
    });
    return res.json({ success: true });
  }
}
