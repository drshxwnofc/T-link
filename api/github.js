// /api/github.js
export default async function handler(req) {
  if (req.method !== 'POST') return new Response('Method Not Allowed', { status: 405 });

  try {
    const { repo } = await req.json();
    if (!repo || !repo.startsWith('https://github.com/')) {
      return new Response('Invalid repo URL', { status: 400 });
    }

    const parts = repo.split('/').slice(-2);
    const name = parts.join('/');

    // Return metadata-only (safe)
    return new Response(JSON.stringify({ imported: true, name }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (err) {
    return new Response('GitHub import error', { status: 500 });
  }
}
