export function search({ query }) {
  return fetch(`/api/subscriptions?q=${query}`, { credentials: "include" });
}

export function invite(id) {
  return fetch(`/api/subscriptions/${id}`, {
    method: "PUT",
    credentials: "include",
  });
}
