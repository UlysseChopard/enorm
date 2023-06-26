const apiUrl = import.meta.env.PROD ? import.meta.env.VITE_API_URL : "/";

export const get = () =>
  fetch(`${apiUrl}api/establishments`, { credentials: "include" });
