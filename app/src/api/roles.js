export function getRoles() {
  return fetch("/api/roles", {
    credentials: "include",
    headers: { Accept: "application/json" },
  });
}

export function declareRole(emails) {
  return fetch("/api/roles", {
    credentials: "include",
    method: "POST",
    headers: { Accept: "application/json", "Content-Type": "application/json" },
    body: JSON.stringify({ emails }),
  });
}
