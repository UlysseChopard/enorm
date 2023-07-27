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
