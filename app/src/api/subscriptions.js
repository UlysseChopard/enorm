export function search({ text }) {
  return fetch(`/api/subscriptions?text=${text}`, { credentials: "include" });
}
