const apiUrl = import.meta.env.PROD ? import.meta.env.VITE_API_URL : "/";

export const get = () =>
  fetch(`${apiUrl}api/working-groups`, { credentials: "include" });

export const getById = (wgId) =>
  fetch(`${apiUrl}api/working-groups/${wgId}`, { credentials: "include" });

export const create = (group) =>
  fetch(`${apiUrl}api/working-groups`, {
    method: "POST",
    credentials: "include",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ group }),
  });
