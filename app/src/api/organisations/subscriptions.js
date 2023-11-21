import { apiUrl } from "@/api";

export const invite = (recipient) => {
  return fetch(
    `${apiUrl}api/organisations/${localStorage.getItem(
      "organisation"
    )}/subscriptions`,
    {
      method: "PUT",
      credentials: "include",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ recipient }),
    }
  );
};

export const get = (query) => {
  const url = `${apiUrl}api/organisations/${localStorage.getItem(
    "organisation"
  )}/subscriptions`;
  return fetch(query ? url + `?q=${query}` : url, {
    credentials: "include",
  });
};

export const establish = (id) => {
  return fetch(
    `${apiUrl}api/organisations/${localStorage.getItem(
      "organisation"
    )}/subscriptions/${id}`,
    {
      method: "POST",
      credentials: "include",
    }
  );
};

export const close = (id) => {
  return fetch(
    `${apiUrl}api/organisations/${localStorage.getItem(
      "organisation"
    )}/subscriptions/${id}`,
    {
      method: "DELETE",
      credentials: "include",
    }
  );
};

export const find = (id) => {
  return fetch(
    `${apiUrl}api/organisations/${localStorage.getItem(
      "organisation"
    )}/subscriptions/${id}`,
    { credentials: "include", headers: { Accept: "application/json" } }
  );
};
