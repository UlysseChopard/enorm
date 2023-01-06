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
