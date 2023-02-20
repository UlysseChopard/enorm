export function search({ query }) {
  return fetch(`/api/subscriptions?q=${query}`, { credentials: "include" });
}

export function invite(id) {
  return fetch(`/api/subscriptions/${id}`, {
    method: "PUT",
    credentials: "include",
  });
}

export function getNews() {
  return fetch("/api/subscriptions", { credentials: "include" });
}
