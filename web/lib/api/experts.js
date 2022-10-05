export const create = ({ email, organisation }) =>
  fetch("http://localhost:4000/api/experts", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email,
      organisation,
    }),
  });
