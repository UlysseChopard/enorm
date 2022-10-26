export function createAccount({ firstName, lastName, email, password }) {
  return fetch(import.meta.env.VITE_API_URL + "/signup", {
    credentials: "include",
    headers: { Accept: "application/json", "Content-Type": "application/json" },
    body: JSON.stringify({ firstName, lastName, email, password }),
  }).then((res) => (res.ok ? res.json() : res.statusText));
}
