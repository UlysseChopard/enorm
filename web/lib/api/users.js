export const create = ({ email, organisation, roles }) =>
  fetch("http://localhost:4000/api/users", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      roles,
      email,
      organisation,
    }),
    credentials: "include",
  });
