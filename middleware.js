// middleware.js
export default async function middleware(req) {
  try {
    const ip = req.headers.get('x-forwarded-for') || 'unknown';
    const now = Date.now();

    if (!global.RATE_LIMIT) global.RATE_LIMIT = {};
    const data = global.RATE_LIMIT[ip] || { count: 0, time: now };

    if (now - data.time < 10000) { // 10s window
      data.count++;
      if (data.count > 50) return new Response('Rate limited', { status: 429 });
    } else {
      data.count = 1;
      data.time = now;
    }

    global.RATE_LIMIT[ip] = data;

    return new Response(null, { status: 200 });
  } catch (err) {
    return new Response('Middleware error', { status: 500 });
  }
      }
