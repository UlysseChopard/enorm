import { apiUrl } from "@/api";

export const replace = (name) =>
  fetch(`${apiUrl}api/organisations/${localStorage.getItem("organisation")}`, {
    method: "PUT",
    credentials: "include",
    body: JSON.stringify({ name }),
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  });

export const get = () =>
  fetch(`${apiUrl}api/organisations/${localStorage.getItem("organisation")}`, {
    method: "GET",
    credentials: "include",
    headers: { Accept: "application/json" },
  });

// used ?
export const close = () =>
  fetch(`${apiUrl}api/organisations/${localStorage.getItem("organisation")}`, {
    method: "DELETE",
    credentials: "include",
  });
