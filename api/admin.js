// /api/admin.js
const ADMIN_EMAIL = 'admin@tlink.app';

export default async function handler(req) {
  const email = req.headers.get('x-admin-email');
  if (email !== ADMIN_EMAIL) return new Response('Forbidden', { status: 403 });

  if (req.method === 'POST') {
    const body = await req.json();
    // Example: log admin action
    return new Response(JSON.stringify({ success: true, action: body.action || 'unknown' }), { status: 200, headers: { 'Content-Type': 'application/json' } });
  }

  return new Response('Method Not Allowed', { status: 405 });
}
