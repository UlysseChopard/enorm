import { apiUrl } from "@/api";

export const uploadUsers = (body) =>
  fetch(`${apiUrl}api/administration/users`, {
    method: "POST",
    headers: { "Content-Type": "multipart/form-data" },
    body,
  });
