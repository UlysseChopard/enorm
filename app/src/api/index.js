export default function authFetch(url, params) {
  const token = localStorage.getItem("token");
  if (token) {
    return fetch(url, {
      ...params,
      headers: { Authorization: `Bearer ${token}`, ...params.headers },
    });
  }
  return fetch(url, { credentials: "include", ...params });
}
