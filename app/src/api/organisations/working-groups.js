import { apiUrl, organisation } from "@/api";

export const get = () =>
  fetch(`${apiUrl}api/organisations/${organisation}/working-groups`, {
    credentials: "include",
  });

export const find = (wgId) =>
  fetch(`${apiUrl}api/organisations/${organisation}/working-groups/${wgId}`, {
    credentials: "include",
  });

export const create = (group) =>
  fetch(`${apiUrl}api/organisations/${organisation}/working-groups`, {
    method: "POST",
    credentials: "include",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ group }),
  });

export const remove = (wg) =>
  fetch(`${apiUrl}api/organisations/${organisation}/working-groups/${wg}`, {
    method: "DELETE",
    credentials: "include",
  });
