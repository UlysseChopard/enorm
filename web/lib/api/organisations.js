export const create = ({ name, address, parent }) =>
  fetch("http://localhost:4000/api/organisations", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name, address, parent }),
  });

export const getAll = () =>
  fetch("http://localhost:4000/api/organisations").then((res) => res.json());
