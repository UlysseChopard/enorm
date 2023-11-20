import { apiUrl } from "@/api";

export const request = (body) =>
  fetch(`${apiUrl}api/organisations/${localStorage.getItem("organisation")}/registrations`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });

export const get = () =>
  fetch(`${apiUrl}api/organisations/${localStorage.getItem("organisation")}/registrations`, {
    credentials: "include",
  });

export const accept = (id, body) =>
  fetch(`${apiUrl}api/organisations/${localStorage.getItem("organisation")}/registrations/${id}`, {
    method: "PATCH",
    credentials: "include",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });

export const deny = (id) =>
  fetch(`${apiUrl}api/organisations/${localStorage.getItem("organisation")}/registrations/${id}`, {
    method: "DELETE",
    credentials: "include",
  });

export const find = (id) =>
  fetch(`${apiUrl}api/organisations/${localStorage.getItem("organisation")}/registrations/${id}`, {
    credentials: "include",
  });
