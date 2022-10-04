export default function fetchJSON(path, { method = "GET", body }) {
  return fetch(path, {
    method,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });
}
