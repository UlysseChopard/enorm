export function getUser() {
  return fetch(import.meta.env.VITE_API_URL + "/user", {
    credentials: "include",
  }).then((res) => (res.ok ? res.json() : res.statusText));
}
