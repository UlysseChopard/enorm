import { apiUrl, organisation } from "@/api";

export const get = () =>
  fetch(`${apiUrl}api/organisations/${organisation}/users`, {
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
    `${apiUrl}api/organisations/${organisation}/users?${qs.toString()}`,
    {
      method: "PATCH",
      body,
    }
  );
};

export const unlink = (user) =>
  fetch(
    `${apiUrl}api/organisations/${organisation}/users/${user}`,
    {
      method: "DELETE",
      credentials: "include",
    }
  );

export const allow = (user, role) =>
  fetch(
    `${apiUrl}api/organisations/${organisation}/users/${user}/roles/${role}`,
    {
      method: "PUT",
      credentials: "include",
    }
  );

export const disallow = (user, role) =>
  fetch(
    `${apiUrl}api/organisations/${organisation}/users/${user}/roles/${role}`,
    {
      method: "DELETE",
      credentials: "include",
    }
  );
