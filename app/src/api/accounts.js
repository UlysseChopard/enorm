import { apiUrl } from "@/api";

export const get = (account) => {
  return fetch(`${apiUrl}api/accounts/${account}`, { credentials: "include" });
};

export const update = (account, infos) => {
  return fetch(`${apiUrl}api/accounts/${account}`, {
    body: (JSON.stringify = infos),
    credentials: "include",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    method: "PATCH",
  });
};

export const create = (infos) => {
  return fetch(`${apiUrl}api/accounts`, {
    body: (JSON.stringify = infos),
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    method: "POST",
  });
};

// used ?
export const close = (account) => {
  return fetch(`${apiUrl}api/accounts/${account}`, {
    credentials: "include",
    method: "DELETE",
  });
};

// resetPassword ?
// sendResetPasswordLink ?
