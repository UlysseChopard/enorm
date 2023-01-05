export function getAccount() {
  return fetch("/api/accounts", { credentials: "include" });
}

export function updateAccount(id, infos) {
  return fetch(`/api/accounts/${id}`, {
    method: "PUT",
    credentials: "include",
    body: JSON.stringify(infos),
    headers: { Accept: "application/json",
      "Content-Type": "application/json" }
  });
}

export function createAccount(infos) {
  return fetch("/api/accounts", {
    method: "POST",
    body: JSON.stringify(infos),
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    }
  });
}

export function deleteAccount(id) {
  return fetch(`/api/accounts/${id}`, {
    method: "DELETE",
    credentials: "include",
  });
}
