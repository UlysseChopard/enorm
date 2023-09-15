import { apiUrl, organisation } from "@/api";

export const get = () =>
  fetch(
    `${apiUrl}api/organisations/${organisation}/establishments`,
    {
      credentials: "include",
    }
  );

export const create = (establishment) =>
  fetch(
    `${apiUrl}api/organisations/${organisation}/establishments`,
    {
      method: "POST",
      credentials: "include",
      body: JSON.stringify(establishment),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    }
  );

export const replace = (id, establishment) =>
  fetch(
    `${apiUrl}api/organisations/${organisation}/establishments/${id}`,
    {
      credentials: "include",
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(establishment),
    }
  );

export const close = (id) =>
  fetch(
    `${apiUrl}api/organisations/${organisation}/establishments/${id}`,
    {
      method: "DELETE",
      credentials: "include",
    }
  );

export const addUser = (user, establishment) =>
  fetch(
    `${apiUrl}api/organisations/${organisation}/establishments/${establishment}/users/${user}`,
    { method: "PUT", credentials: "include" }
  );

export const removeUser = (user, establishment) =>
  fetch(
    `${apiUrl}api/organisations/${organisation}/establishments/${establishment}/users/${user}`,
    { method: "DELETE", credentials: "include" }
  );
