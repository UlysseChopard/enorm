export const ask = (body) =>
  fetch("/api/registrations", {
    method: "POST",
    credentials: "include",
    headers: {
       "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });
