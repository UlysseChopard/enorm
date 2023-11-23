import { apiUrl } from "@/api";

export const add = (subscription, manager) =>
  fetch(
    `${apiUrl}api/organisations/${localStorage.getItem(
      "organisation"
    )}/subscriptions/${subscription}/managers/${manager}`,
    {
      method: "PUT",
      credentials: "include",
      headers: { Accept: "application/json" },
    }
  );
