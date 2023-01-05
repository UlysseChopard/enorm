export function get() {
  return fetch("/api/accounts", { credentials: "include" });
}

export function update(id, infos) {
  return fetch(`/api/accounts/${id}`, {
    body: JSON.stringify(infos),
    credentials: "include",
    headers: { Accept: "application/json",
      "Content-Type": "application/json" },
    method: "PUT",
  });
}

export function create(infos) {
  return fetch("/api/accounts", {
    body: JSON.stringify(infos),
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    },
    method: "POST",
  });
}

export function close(id) {
  return fetch(`/api/accounts/${id}`, {
    credentials: "include",
    method: "DELETE",
  });
}
