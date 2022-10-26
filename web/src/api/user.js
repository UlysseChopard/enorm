const returnContentOrNull = (res) => (res.ok ? res.json() : null);

export function getUser() {
  return fetch(import.meta.env.VITE_API_URL + "/user", {
    credentials: "include",
  }).then(returnContentOrNull);
}

export function createAccount({ firstName, lastName, email }) {
  return fetch(import.meta.env.VITE_API_URL + "/signup", {
    credentials: "include",
    headers: { Accept: "application/json", "Content-Type": "application/json" },
    body: JSON.stringify({ firstName, lastName, email }),
  }).then(returnContentOrNull);
}

export function login({ email, password }) {
  return fetch(import.meta.env.VITE_URL_API + "/login", {
    credentials: "include",
    headers: { Accept: "application/json", "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  }).then(returnContentOrNull);
}
