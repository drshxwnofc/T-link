import crypto from 'crypto';
import { authenticate } from './utils.js';

let APPS = [];

export default async function handler(req) {
  const user = authenticate(req);
  if(!user) return new Response('Unauthorized', { status: 401 });

  try {
    if(req.method === 'GET') {
      const apps = user.role === 'admin' ? APPS : APPS.filter(a => a.owner === user.email);
      return new Response(JSON.stringify(apps), { status: 200, headers: { 'Content-Type': 'application/json' } });
    }

    if(req.method === 'POST') {
      const { name, code } = await req.json();
      if(!name || !code) return new Response('Missing name/code', { status: 400 });
      const app = { id: crypto.randomUUID(), name, code, owner: user.email, status: 'ready', createdAt: Date.now() };
      APPS.push(app);
      return new Response(JSON.stringify(app), { status: 200, headers: { 'Content-Type': 'application/json' } });
    }

    if(req.method === 'DELETE') {
      const { id } = await req.json();
      const appIndex = APPS.findIndex(a => a.id === id);
      if(appIndex === -1) return new Response('App not found', { status: 404 });

      // Only admin or owner can delete
      if(user.role !== 'admin' && APPS[appIndex].owner !== user.email) {
        return new Response('Forbidden', { status: 403 });
      }

      APPS.splice(appIndex, 1);
      return new Response(JSON.stringify({ success: true }), { status: 200, headers: { 'Content-Type': 'application/json' } });
    }

    return new Response('Method Not Allowed', { status: 405 });
  } catch(e) {
    return new Response('Apps error', { status: 500 });
  }
                                      }
