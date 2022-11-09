export function getManagers() {
  return fetch("/api/managers", {
    credentials: "include",
    headers: { Accept: "application/json" },
  });
}

export function declareManager(emails) {
  return fetch("/api/managers", {
    credentials: "include",
    method: "POST",
    headers: { Accept: "application/json", "Content-Type": "application/json" },
    body: JSON.stringify({ emails }),
  });
}

export function uploadManagers(body) {
  return fetch("/api/managers/upload", {
    credentials: "include",
    method: "POST",
    body,
  });
}
