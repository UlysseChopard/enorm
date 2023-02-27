export function search({ query }) {
  return fetch(`/api/subscriptions?q=${query}`, { credentials: "include" });
}

export function invite(recipient) {
  return fetch("/api/subscriptions", {
    method: "PUT",
    credentials: "include",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ recipient }),
  });
}

export function getNews() {
  return fetch("/api/subscriptions", { credentials: "include" });
}
