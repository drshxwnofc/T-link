// /api/utils.js
let SESSIONS = {}; // Shared with auth.js (or import in production via KV/DB)

export function authenticate(req) {
  const token = req.headers.get('Authorization');
  if (!token || !SESSIONS[token]) return null;
  return SESSIONS[token]; // returns { email, role, coins, createdAt }
}
