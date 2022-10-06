export const create = ({ name, address, parent }) =>
  fetch("http://localhost:4000/api/organisations", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name, address, parent }),
    credentials: "include",
  });

export const getAll = () =>
  fetch("http://localhost:4000/api/organisations", {
    credentials: "include",
  }).then((res) => res.json());
