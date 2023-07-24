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

export const uploadUsers = (body, { separator, emailColumn, noHeader }) => {
  const qs = new URLSearchParams();
  if (separator) {
    qs.set("separator", encodeURIComponent(separator));
  }
  if (emailColumn) {
    qs.set("email-column", encodeURIComponent(emailColumn));
  }
  if (noHeader) {
    qs.set("no-header", "true");
  }
  return fetch(`${apiUrl}api/administration/users?${qs.toString()}`, {
    method: "POST",
    body,
  });
};
