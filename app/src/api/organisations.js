import { apiUrl } from "@/api";

export function join(organisation) {
  return fetch(`${apiUrl}api/organisations/${organisation}`, {
    method: "PUT",
    credentials: "include",
  });
}

export function leave(organisation) {
  return fetch(`${apiUrl}api/organisations/${organisation}`, {
    method: "DELETE",
    credentials: "include",
  });
}
