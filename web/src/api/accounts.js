const URL = `${import.meta.env.VITE_API_URL}/accounts`;

export function getUser() {
  return fetch(URL, {
    credentials: "include",
  });
}

export function signup(infos) {
  return fetch(`${URL}/signup`, {
    method: "POST",
    credentials: "include",
    body: JSON.stringify(infos),
    headers: { Accept: "application/json", "Content-Type": "application/json" },
  });
}

export function login(infos) {
  return fetch(`${URL}/login`, {
    method: "POST",
    credentials: "include",
    body: JSON.stringify(infos),
    headers: { Accept: "application/json", "Content-Type": "application/json" },
  });
}

export function logout() {
  return fetch(`${URL}/logout`, { method: "POST", credentials: "include" });
}

export function activate(uuid) {
  return fetch(`${URL}/${uuid}/activate`, { credentials: "include" });
}

export function deleteAccount() {
  return fetch(URL, { method: "DELETE", credentials: "include" });
}
