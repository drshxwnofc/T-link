// /api/apps.js
let APPS = [];

export default async function handler(req) {
  try {
    if (req.method === 'GET') {
      return new Response(JSON.stringify(APPS), { status: 200, headers: { 'Content-Type': 'application/json' } });
    }

    if (req.method === 'POST') {
      const { name, code } = await req.json();
      if (!name || !code) return new Response('Missing name/code', { status: 400 });

      const app = { id: crypto.randomUUID(), name, code, status: 'ready', createdAt: Date.now() };
      APPS.push(app);

      return new Response(JSON.stringify(app), { status: 200, headers: { 'Content-Type': 'application/json' } });
    }

    return new Response('Method Not Allowed', { status: 405 });
  } catch (err) {
    return new Response('Apps error', { status: 500 });
  }
        }
