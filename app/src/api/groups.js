export const get = () => fetch("/api/groups", { credentials: "include" });

export const create = (group) =>
  fetch("/api/groups", {
    method: "POST",
    credentials: "include",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ group }),
  });

export const getById = (id) =>
  fetch(`/api/groups/${id}`, { credentials: "include" });

export const join = (id) => fetch(`/api/groups/${id}`, { method: "POST", credentials: "include" });
