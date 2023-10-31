import { apiUrl, organisation } from "@/api";

export const invite = (recipient) => {
  return fetch(`${apiUrl}api/organisations/${organisation}/subscriptions`, {
    method: "PUT",
    credentials: "include",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ recipient }),
  });
};

export const get = (query) => {
  const url = `${apiUrl}api/organisations/${organisation}/subscriptions`;
  return fetch(query ? url + `?q=${query}` : url, {
    credentials: "include",
  });
};

export const establish = (id) => {
  return fetch(
    `${apiUrl}api/organisations/${organisation}/subscriptions/${id}`,
    {
      method: "POST",
      credentials: "include",
    }
  );
};

export const close = (id) => {
  return fetch(
    `${apiUrl}api/organisations/${organisation}/subscriptions/${id}`,
    {
      method: "DELETE",
      credentials: "include",
    }
  );
};

// where is search ?
