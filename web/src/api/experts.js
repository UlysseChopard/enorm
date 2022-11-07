export function getExperts() {
  return fetch("/api/experts", {
    credentials: "include",
    headers: { Accept: "application/json" },
  });
}

export function declareExpert(email) {
  return fetch("/api/experts", {
    credentials: "include",
    method: "POST",
    headers: { Accept: "application/json", "Content-Type": "application/json" },
    body: JSON.stringify({ email }),
  });
}

export function uploadExperts(body) {
  return fetch("/api/experts/upload", {
    credentials: "include",
    method: "POST",
    body,
  });
}
