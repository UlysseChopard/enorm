export const apiUrl = import.meta.env.PROD ? import.meta.env.VITE_API_URL : "/";

export const organisation = localStorage.getItem("organisation");
