export function signup(infos) {
  return fetch("/api/accounts/signup", {
    method: "POST",
    credentials: "include",
    body: JSON.stringify(infos),
    headers: { Accept: "application/json", "Content-Type": "application/json" },
  });
}

export function login(infos) {
  return fetch("/api/accounts/login", {
    method: "POST",
    credentials: "include",
    headers: { Accept: "application/json", "Content-Type": "application/json" },
    body: JSON.stringify(infos),
  });
}

export function logout() {
  return fetch("/api/accounts/logout", {
    method: "POST",
    credentials: "include",
  });
}
