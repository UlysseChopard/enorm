const apiUrl = import.meta.env.PROD ? import.meta.env.VITE_API_URL : "/";

export const get = () =>
  fetch(`${apiUrl}api/establishments`, { credentials: "include" });

export const create = (establishment) =>
  fetch(`${apiUrl}api/establishments`, {
    method: "POST",
    credentials: "include",
    body: JSON.stringify(establishment),
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  });

export const update = (id, establishment) =>
  fetch(`${apiUrl}api/establishments/${id}`, {
    credentials: "include",
    method: "PUT",
    headers: { Accept: "application/json", "Content-Type": "application/json" },
    body: JSON.stringify(establishment),
  });

export const remove = (id) =>
  fetch(`${apiUrl}api/establishments/${id}`, {
    method: "DELETE",
    credentials: "include",
  });
