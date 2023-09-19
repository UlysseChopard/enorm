import { apiUrl } from "@/api";

// used ?
export const getStatus = () => {
  return fetch(`${apiUrl}api/sessions`, { credentials: "include" });
};

export const login = (infos) => {
  return fetch(`${apiUrl}api/sessions`, {
    body: JSON.stringify(infos),
    credentials: "include",
    headers: { Accept: "application/json", "Content-Type": "application/json" },
    method: "PUT",
  });
};

export const logout = () => {
  return fetch(`${apiUrl}api/sessions`, {
    credentials: "include",
    method: "DELETE",
  });
};

export const getMagicLink = (email) => {
  return fetch(`${apiUrl}api/sessions/no-password`, {
    method: "POST",
    headers: { Accept: "application/json", "Content-Type": "application/json" },
    body: JSON.stringify({ email }),
  });
};

// used ?
export const requestAccess = (token) => {
  return fetch(`${apiUrl}api/sessions/no-password`, {
    credentials: "include",
    method: "PUT",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
};
