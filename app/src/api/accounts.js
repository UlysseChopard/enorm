import { apiUrl } from "@/api";

export function get() {
  return fetch(`${apiUrl}api/accounts`, { credentials: "include" });
}

export function update(infos) {
  return fetch(`${apiUrl}api/accounts`, {
    body: JSON.stringify(infos),
    credentials: "include",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    method: "PATCH",
  });
}

export function create(infos) {
  return fetch(`${apiUrl}api/accounts`, {
    body: JSON.stringify(infos),
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    method: "POST",
  });
}

export function close() {
  return fetch(`${apiUrl}api/accounts`, {
    credentials: "include",
    method: "DELETE",
  });
}
