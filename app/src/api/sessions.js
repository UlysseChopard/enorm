export function getStatus() {
  return fetch("/api/sessions", { credentials: "include" });
}

export function login(infos) {
  return fetch("/api/sessions", {
    body: JSON.stringify(infos),
    credentials: "include",
    headers: { Accept: "application/json", "Content-Type": "application/json" },
    method: "PUT",
  });
}

export function logout() {
  return fetch("/api/sessions", {
    credentials: "include",
    method: "DELETE",
  });
}

export function getMagicLink(email) {
  return fetch("/api/sessions/no-password", {
    method: "POST",
    headers: { Accept: "application/json", "Content-Type": "application/json" },
    body: JSON.stringify({ email }),
  });
}

export function requestAccess(token) {
  return fetch("/api/sessions/no-password", {
    credentials: "include",
    method: "PUT",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
}
