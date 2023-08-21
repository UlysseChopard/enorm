import { apiUrl, organisation } from "@/api";

export const replace = (id, name) =>
  fetch(
    `${apiUrl}api/organisations/${organisation}/administration/organisations/${id}`,
    {
      method: "PUT",
      credentials: "include",
      body: JSON.stringify({ name }),
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    }
  );

export const get = () =>
  fetch(
    `${apiUrl}api/organisations/${organisation}/administration/organisations`,
    {
      method: "GET",
      credentials: "include",
      headers: { Accept: "application/json" },
    }
  );
