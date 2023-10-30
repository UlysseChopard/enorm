import { apiUrl, organisation } from "@/api";

export const disallow = (member, role) =>
  fetch(
    `${apiUrl}api/organisations/${organisation}/members/${member}/roles/${role}`,
    {
      method: "DELETE",
      credentials: "include",
    }
  );

export const allow = (member, role, org) =>
  fetch(
    `${apiUrl}api/organisations/${org ? org : organisation}/members/${member}/roles/${role}`,
    {
      method: "PUT",
      credentials: "include",
    }
  );
