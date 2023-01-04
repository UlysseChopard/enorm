export function updatePassword(oldpass, newpass) {
  return fetch("/api/accounts/password", {
    method: "PUT",
    credentials: "include",
    headers: { Accept: "application/json", "Content-Type": "application/json" },
    body: JSON.stringify({ oldpass, newpass }),
  });
}

export function resetPassword(infos) {
  return fetch("/api/accounts/password/reset", {
    method: "PUT",
    headers: { Accept: "application/json", "Content-Type": "application/json" },
    body: JSON.stringify(infos),
  });
}
