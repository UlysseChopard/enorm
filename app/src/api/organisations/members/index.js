import { apiUrl } from "@/api";

export const get = (query) => {
  return fetch(
    `${apiUrl}api/organisations/${localStorage.getItem(
      "organisation",
    )}/members${
      query ? "?" + new URLSearchParams(Object.entries(query)).toString() : ""
    }`,
    {
      method: "GET",
      credentials: "include",
      headers: { Accept: "application/json" },
    },
  );
};

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
    `${apiUrl}api/organisations/${localStorage.getItem(
      "organisation",
    )}/members?${qs.toString()}`,
    {
      method: "PATCH",
      credentials: "include",
      body,
    },
  );
};

export const addOne = (email, roles) =>
  fetch(
    `${apiUrl}api/organisations/${localStorage.getItem(
      "organisation",
    )}/members`,
    {
      method: "POST",
      body: JSON.stringify({ email, roles }),
      credentials: "include",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    },
  );

export const unlink = (member) =>
  fetch(
    `${apiUrl}api/organisations/${localStorage.getItem(
      "organisation",
    )}/members/${member}`,
    {
      method: "DELETE",
      credentials: "include",
    },
  );
