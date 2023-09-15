import { apiUrl, organisation } from "@/api";

export const get = () =>
  fetch(`${apiUrl}api/organisations/${organisation}/members`, {
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
  return fetch(
    `${apiUrl}api/organisations/${organisation}/members?${qs.toString()}`,
    {
      method: "PATCH",
      body,
    }
  );
};

export const unlink = (member) =>
  fetch(`${apiUrl}api/organisations/${organisation}/members/${member}`, {
    method: "DELETE",
    credentials: "include",
  });

export const allow = (member, role) =>
  fetch(
    `${apiUrl}api/organisations/${organisation}/members/${member}/roles/${role}`,
    {
      method: "PUT",
      credentials: "include",
    }
  );

export const disallow = (member, role) =>
  fetch(
    `${apiUrl}api/organisations/${organisation}/members/${member}/roles/${role}`,
    {
      method: "DELETE",
      credentials: "include",
    }
  );
