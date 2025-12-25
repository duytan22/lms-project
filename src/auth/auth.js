const TOKEN_KEY = 'lms_token';

export function login(username, password) {
  if (username === 'admin' && password === '123') {
    localStorage.setItem(TOKEN_KEY, 'fake-token');
    return true;
  }
  return false;
}

export function logout() {
  localStorage.removeItem(TOKEN_KEY);
}

export function isAuthenticated() {
  return !!localStorage.getItem(TOKEN_KEY);
}
