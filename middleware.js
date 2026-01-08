export default async function middleware(req) {
  const ip = req.headers['x-forwarded-for'] || 'unknown';
  const now = Date.now();

  // Simple rate-limit example
  if (!global.RATE_LIMIT) global.RATE_LIMIT = {};
  const data = global.RATE_LIMIT[ip] || { count: 0, time: now };

  if (now - data.time < 10000) {
    data.count++;
    if (data.count > 50) {
      return new Response('Rate limited', { status: 429 });
    }
  } else {
    data.count = 1;
    data.time = now;
  }

  global.RATE_LIMIT[ip] = data;

  // Must return a Response
  return new Response(null, { status: 200 });
}
