import { apiUrl } from "@/api";

export const create = (subscription, manager) =>
  fetch(
    `${apiUrl}api/organisations/${localStorage.getItem(
      "organisation"
    )}/subscriptions/${subscription}/managers/${manager}`,
    {
      method: "POST",
      credentials: "include",
      headers: { Accept: "application/json" },
    }
  );
