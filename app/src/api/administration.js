import { apiUrl } from "@/api";

export const updateSociety = (id, name) =>
  fetch(`${apiUrl}api/administration/society/${id}`, {
    method: "PUT",
    credentials: "include",
    body: JSON.stringify({ name }),
    headers: { "Content-Type": "application/json", Accept: "application/json" },
  });

export const get = () =>
  fetch(`${apiUrl}api/administration`, {
    method: "GET",
    credentials: "include",
    headers: { Accept: "application/json" },
  });
