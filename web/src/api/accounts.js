export function getUser() {
  return fetch("/api/accounts/infos", {
    credentials: "include",
  });
}

export function authStatus() {
  return fetch("/api/accounts", { credentials: "include" });
}

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
    body: JSON.stringify(infos),
    headers: { Accept: "application/json", "Content-Type": "application/json" },
  });
}

export function logout() {
  return fetch("/api/accounts/logout", {
    method: "POST",
    credentials: "include",
  });
}

export function activate(uuid) {
  return fetch(`api/accounts/${uuid}/activate`, { credentials: "include" });
}

export function deleteAccount() {
  return fetch("/api/accounts", { method: "DELETE", credentials: "include" });
}

export function sendActivation() {
  return fetch("/api/accounts/activate", { ccredentials: "include" });
}

export function update(infos) {
  return fetch("/api/accounts", {
    method: "PATCH",
    credentials: "include",
    body: JSON.stringify(infos),
    headers: { Accept: "application/json", "Content-Type": "application/json" },
  });
}
