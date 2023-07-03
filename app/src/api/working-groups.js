import { apiUrl } from "@/api";

export const get = () =>
  fetch(`${apiUrl}api/working-groups`, { credentials: "include" });

export const getById = (wgId) =>
  fetch(`${apiUrl}api/working-groups/${wgId}`, { credentials: "include" });

export const create = (group) =>
  fetch(`${apiUrl}api/working-groups`, {
    method: "POST",
    credentials: "include",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ group }),
  });

export const deleteById = (id) =>
  fetch(`${apiUrl}api/working-groups/${id}`, {
    method: "DELETE",
    credentials: "include",
  });
