import { apiUrl } from "@/api";

export const create = (organisationMember) =>
  fetch(`${apiUrl}api/sessions/tokens`, {
    method: "PUT",
    credentials: "include",
    headers: { "Content-Type": "application/json", Accept: "application/json" },
    body: JSON.stringify({ organisationMember }),
  });

export const remove = (token) =>
  fetch(`${apiUrl}api/sessions/tokens/${token}`, {
    method: "DELETE",
    credentials: "include",
    headers: { Accept: "application/json" },
  });
