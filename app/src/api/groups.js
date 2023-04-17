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
