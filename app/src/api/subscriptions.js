export function search({ query }) {
  return fetch(`/api/subscriptions?q=${query}`, { credentials: "include" });
}
