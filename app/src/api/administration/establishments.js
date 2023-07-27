import { apiUrl } from "@/api";

export const get = () =>
  fetch(`${apiUrl}api/administration/establishments`, {
    credentials: "include",
  });

export const create = (establishment) =>
  fetch(`${apiUrl}api/administration/establishments`, {
    method: "POST",
    credentials: "include",
    body: JSON.stringify(establishment),
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  });

export const replace = (id, establishment) =>
  fetch(`${apiUrl}api/administration/establishments/${id}`, {
    credentials: "include",
    method: "PUT",
    headers: { Accept: "application/json", "Content-Type": "application/json" },
    body: JSON.stringify(establishment),
  });

export const close = (id) =>
  fetch(`${apiUrl}api/administration/establishments/${id}`, {
    method: "DELETE",
    credentials: "include",
  });
