export function getExperts() {
  return fetch("/api/experts", {
    credentials: "include",
    headers: { Accept: "application/json" },
  });
}

export function declareExpert(emails) {
  return fetch("/api/experts", {
    credentials: "include",
    method: "POST",
    headers: { Accept: "application/json", "Content-Type": "application/json" },
    body: JSON.stringify({ emails }),
  });
}

export function uploadExperts(body) {
  return fetch("/api/experts/upload", {
    credentials: "include",
    method: "POST",
    body,
  });
}
