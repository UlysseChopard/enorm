export const get = () =>
  fetch("/api/working-groups", { credentials: "include" });

export const getById = (wgId) =>
  fetch(`/api/working-groups/${wgId}`, { credentials: "include" });

export const create = (group) =>
  fetch("/api/working-groups", {
    method: "POST",
    credentials: "include",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ group }),
  });
