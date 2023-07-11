import { apiUrl } from "@/api";

export const updateOrganisation = (id, name) =>
  fetch(`${apiUrl}api/administration/organisations/${id}`, {
    method: "PUT",
    credentials: "include",
    body: JSON.stringify({ name }),
    headers: { "Content-Type": "application/json", Accept: "application/json" },
  });

export const get = () =>
  fetch(`${apiUrl}api/administration`, {
    method: "GET",
    credentials: "include",
    headers: { Accept: "application/json" },
  });

export const uploadUsers = (body, { separator = ",", emailColumn = "email" }) =>
  fetch(
    `${apiUrl}api/administration/users?separator=${encodeURIComponent(
      separator
    )}&email-column=${encodeURIComponent(emailColumn)}`,
    {
      method: "POST",
      body,
    }
  );
