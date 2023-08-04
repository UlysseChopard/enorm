import { apiUrl } from "@/api";

export const get = () =>
  fetch(`${apiUrl}api/administration/users`, {
    method: "GET",
    credentials: "include",
    headers: { Accept: "application/json" },
  });

export const add = (body, { separator, emailColumn, noHeader }) => {
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
    method: "PATCH",
    body,
  });
};

export const unlink = (user) =>
  fetch(`${apiUrl}api/administration/users/${user}`, {
    method: "DELETE",
    credentials: "include",
  });

export const allow = (user, role) =>
  fetch(`${apiUrl}api/administration/users/${user}/roles/${role}`, {
    method: "PUT",
    credentials: "include",
  });

export const disallow = (user, role) =>
  fetch(`${apiUrl}api/administration/users/${user}/roles/${role}`, {
    method: "DELETE",
    credentials: "include",
  });

export const modify = (user, modification) =>
  fetch(`${apiUrl}api/administration/users/${user}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json", Accept: "application/json" },
    body: JSON.stringify(modification),
    credentials: "include",
  });
