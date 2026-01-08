import { authenticate } from './utils.js';

export default async function handler(req) {
  const user = authenticate(req);
  if (!user || user.role !== 'admin') return new Response('Forbidden', { status: 403 });

  if (req.method === 'POST') {
    const body = await req.json();
    // Log admin action
    return new Response(JSON.stringify({ success: true, action: body.action || 'unknown' }), { status: 200, headers: { 'Content-Type': 'application/json' } });
  }

  return new Response('Method Not Allowed', { status: 405 });
}
