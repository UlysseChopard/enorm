import { apiUrl } from "@/api";

export const request = (body) =>
  fetch(`${apiUrl}api/registrations`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });

export const get = () =>
  fetch(`${apiUrl}api/registrations`, { credentials: "include" });

export const accept = (id, body) =>
  fetch(`${apiUrl}api/registrations/${id}`, {
    method: "PATCH",
    credentials: "include",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });

export const deny = (id) =>
  fetch(`${apiUrl}api/registrations/${id}`, {
    method: "DELETE",
    credentials: "include",
  });

export const find = (id) =>
  fetch(`${apiUrl}api/registrations/${id}`, { credentials: "include" });
