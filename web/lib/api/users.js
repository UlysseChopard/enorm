export const create = ({ email, organisation, role }) =>
  fetch("http://localhost:4000/api/users", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      role,
      email,
      organisation,
    }),
    credentials: "include",
  });
