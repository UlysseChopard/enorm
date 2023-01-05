export function getSessionStatus() {
  return fetch("/api/sessions", { credentials: true });
}

export function login(infos) {
  return fetch("/api/accounts/login", {
    body: JSON.stringify(infos),
    credentials: "include",
    headers: { Accept: "application/json", "Content-Type": "application/json" },
    method: "POST",
  });
}

export function logout() {
  return fetch("/api/accounts/logout", {
    credentials: "include",
    method: "POST",
  });
}
