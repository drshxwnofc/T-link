let APPS = [];

export default async function handler(req, res) {
  if (req.method === 'GET') {
    return res.json(APPS);
  }

  if (req.method === 'POST') {
    const { name } = JSON.parse(req.body);
    const app = {
      id: crypto.randomUUID(),
      name,
      status: 'stopped',
      created_at: Date.now()
    };
    APPS.push(app);
    return res.json(app);
  }

  res.status(405).end();
}
