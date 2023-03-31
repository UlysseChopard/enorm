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

export const setRegistrationsOpenness = (id, isOpen) =>
  fetch(`/api/groups/${id}/registrations/${isOpen ? "open" : "closed"}`, {
    method: "PUT",
    credentials: "include",
  });

export const setVisibility = (id, isVisible) =>
  fetch(`/api/groups/${id}/registrations/${isVisible ? "visible" : "hidden"}`, {
    method: "PUT",
    credentials: "include",
  });
