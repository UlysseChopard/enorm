import { apiUrl } from "@/api";

export const get = () =>
  fetch(`${apiUrl}api/admin/organisations`, {
    credentials: "include",
    headers: { Accept: "application/json" },
  });

export const create = (organisation) =>
  fetch(`${apiUrl}api/admin/organisations`, {
    method: "POST",
    credentials: "include",
    headers: { Accept: "application/json", "Content-Type": "application/json" },
    body: JSON.stringify(organisation),
  });

export const remove = (id) =>
  fetch(`${apiUrl}api/admin/organisations/${id}`, {
    method: "DELETE",
    credentials: "include",
    headers: { Accept: "application/json" },
  });
