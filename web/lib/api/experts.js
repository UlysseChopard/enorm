export const fillProfile = (infos) =>
  fetch("http://localhost:4000/api/experts", {
    method: "POST",
    credentials: "include",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(infos),
  });
