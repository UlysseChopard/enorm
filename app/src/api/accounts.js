import { apiUrl } from "@/api";

export function get(account) {
  return fetch(`${apiUrl}api/accounts/${account}`, { credentials: "include" });
}

export function update(account, infos) {
  return fetch(`${apiUrl}api/accounts/${account}`, {
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

export function close(account) {
  return fetch(`${apiUrl}api/accounts/${account}`, {
    credentials: "include",
    method: "DELETE",
  });
}

export function join(account, user) {
  return fetch(`${apiUrl}api/accounts/${account}/users/${user}`, {
    method: "PUT",
    credentials: "include",
  });
}

export function leave(account, user) {
  return fetch(`${apiUrl}api/accounts/${account}/users/${user}`, {
    method: "DELETE",
    credentials: "include",
  });
}
