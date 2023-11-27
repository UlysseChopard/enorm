import { apiUrl } from "@/api";

export const add = (subscription, organisationMember) =>
  fetch(
    `${apiUrl}api/organisations/${localStorage.getItem(
      "organisation"
    )}/subscriptions/${subscription}/managers`,
    {
      method: "PUT",
      credentials: "include",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ organisationMember }),
    }
  );

export const remove = (subscription, manager) =>
  fetch(
    `${apiUrl}api/organisations/${localStorage.getItem(
      "organisation"
    )}/subscriptions/${subscription}/managers/${manager}`,
    {
      method: "DELETE",
      credentials: "include",
      headers: { Accept: "application/json" },
    }
  );
