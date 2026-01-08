async function login() {
  const res = await fetch('/api/auth', {
    method: 'POST',
    body: JSON.stringify({
      email: email.value,
      password: password.value
    })
  });
  if (res.ok) location.href = '/app.html';
}
window.login = login;
