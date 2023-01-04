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

export function activate(uuid) {
  return fetch(`/api/accounts/${uuid}/activate`, { credentials: "include" });
}

export function deleteAccount() {
  return fetch("/api/accounts", { method: "DELETE", credentials: "include" });
}

export function sendActivation() {
  return fetch("/api/accounts/activate", { credentials: "include" });
}

export function update(infos) {
  return fetch("/api/accounts", {
    method: "PATCH",
    credentials: "include",
    headers: { Accept: "application/json", "Content-Type": "application/json" },
    body: JSON.stringify(infos),
  });
}

export function updatePassword(oldpass, newpass) {
  return fetch("/api/accounts/password", {
    method: "PUT",
    credentials: "include",
    headers: { Accept: "application/json", "Content-Type": "application/json" },
    body: JSON.stringify({ oldpass, newpass }),
  });
}

export function sendResetPasswordLink(email) {
  return fetch("/api/accounts/password/reset", {
    method: "POST",
    headers: { Accept: "application/json", "Content-Type": "application/json" },
    body: JSON.stringify({ email }),
  });
}

export function resetPassword(infos) {
  return fetch("/api/accounts/password/reset", {
    method: "PUT",
    headers: { Accept: "application/json", "Content-Type": "application/json" },
    body: JSON.stringify(infos),
  });
}
