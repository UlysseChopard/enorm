import { apiUrl } from "@/api";

export const get = (query) => {
  const qs = query ? new URLSearchParams({ q: encodeURIComponent(query) }) : "";
  return fetch(
    `${apiUrl}api/organisations/${localStorage.getItem("organisation")}/working-groups${qs}`,
    {
      credentials: "include",
    },
  );
};

export const find = (wgId) =>
  fetch(
    `${apiUrl}api/organisations/${localStorage.getItem("organisation")}/working-groups/${wgId}`,
    {
      credentials: "include",
    },
  );

export const create = (group) =>
  fetch(
    `${apiUrl}api/organisations/${localStorage.getItem("organisation")}/working-groups`,
    {
      method: "POST",
      credentials: "include",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(group),
    },
  );

export const remove = (wg) =>
  fetch(
    `${apiUrl}api/organisations/${localStorage.getItem("organisation")}/working-groups/${wg}`,
    {
      method: "DELETE",
      credentials: "include",
    },
  );
