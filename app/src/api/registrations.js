export const request = (body) =>
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

export const accept = (id, body) =>
  fetch(`/api/registrations/${id}`, {
    method: "PATCH",
    credentials: "include",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });

export const deny = (id) =>
  fetch(`/api/registrations/${id}`, {
    method: "DELETE",
    credentials: "include",
  });
