import { NextResponse } from 'next/server';

const RATE = new Map();

export function middleware(req) {
  const ip = req.ip || 'unknown';
  const now = Date.now();

  const data = RATE.get(ip) || { count: 0, time: now };
  if (now - data.time < 10000) {
    data.count++;
    if (data.count > 50) {
      return new NextResponse('Rate limited', { status: 429 });
    }
  } else {
    data.count = 1;
    data.time = now;
  }

  RATE.set(ip, data);
  return NextResponse.next();
}
