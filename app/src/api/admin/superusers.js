import { apiUrl } from "@/api";

export const get = () =>
  fetch(`${apiUrl}api/admin/superusers`, {
    credentials: "include",
    headers: { Accept: "application/json" },
  });

export const create = (superuser) =>
  fetch(`${apiUrl}api/admin/superusers`, {
    method: "POST",
    credentials: "include",
    headers: { Accept: "application/json", "Content-Type": "application/json" },
    body: JSON.stringify(superuser),
  });

export const remove = (id) =>
  fetch(`${apiUrl}api/admin/superusers/${id}`, {
    method: "DELETE",
    credentials: "include",
    headers: { Accept: "application/json" },
  });
