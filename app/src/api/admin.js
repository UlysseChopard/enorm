import { apiUrl } from "@/api";

export const getAll = () =>
  fetch(`${apiUrl}api/admin`, { credentials: "include" });
