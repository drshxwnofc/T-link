export function validateCode(code) {
  const blocked = ['fetch(', 'XMLHttpRequest', 'import ', 'require('];
  for (const b of blocked) {
    if (code.includes(b)) return false;
  }
  return true;
}
