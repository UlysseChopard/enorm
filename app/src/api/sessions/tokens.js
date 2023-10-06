import { apiUrl } from "@/api";

export const create = (account) =>
  fetch(`${apiUrl}api/sessions/tokens`, {
    method: "POST",
    credentials: "include",
    headers: { "Content-Type": "application/json", Accept: "application/json" },
    body: JSON.stringify({ account }),
  });

export const login = (token) =>
  fetch(`${apiUrl}api/sessions/tokens/${token}`, {
    method: "POST",
    credentials: "include",
    headers: { Accept: "application/json" },
  });

export const remove = (token) =>
  fetch(`${apiUrl}api/sessions/tokens/${token}`, {
    method: "DELETE",
    credentials: "include",
    headers: { Accept: "application/json" },
  });
