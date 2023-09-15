import { apiUrl, organisation } from "@/api";

export function search(query) {
  return fetch(
    `${apiUrl}api/organisations/${organisation}/subscriptions?q=${query}`,
    {
      credentials: "include",
    }
  );
}

export function invite(recipient) {
  return fetch(`${apiUrl}api/organisations/${organisation}/subscriptions`, {
    method: "PUT",
    credentials: "include",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ recipient }),
  });
}

export function getNews() {
  return fetch(`${apiUrl}api/organisations/${organisation}/subscriptions`, {
    credentials: "include",
  });
}

export function accept(id) {
  return fetch(
    `${apiUrl}api/organisations/${organisation}/subscriptions/${id}`,
    {
      method: "POST",
      credentials: "include",
    }
  );
}

export function deny(id) {
  return fetch(
    `${apiUrl}api/organisations/${organisation}/subscriptions/${id}`,
    {
      method: "DELETE",
      credentials: "include",
    }
  );
}
