export const ask = (body) =>
  fetch("/api/registrations", {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });

export const get = () =>
  fetch("/api/registrations", { credentials: "include" });

export const accept = (group) =>
  fetch(`/api/registrations/${group.id}`, {
    method: "PUT",
    credentials: "include",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(group),
  });

export const deny = (id) =>
  fetch(`/api/registrations/${id}`, {
    method: "DELETE",
    credentials: "include",
  });
