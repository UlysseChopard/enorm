import { apiUrl, organisation } from "@/api";

export const replace = (name) =>
  fetch(`${apiUrl}api/organisations/${organisation}/administration`, {
    method: "PUT",
    credentials: "include",
    body: JSON.stringify({ name }),
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  });

export const get = () =>
  fetch(`${apiUrl}api/organisations/${organisation}/administration`, {
    method: "GET",
    credentials: "include",
    headers: { Accept: "application/json" },
  });
