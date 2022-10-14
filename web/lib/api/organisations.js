export const create = ({ name, address, parent }) =>
  fetch(`${process.env.NEXT_PUBLIC_API_URL}/organisations`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name, address, parent }),
    credentials: "include",
  });

export const getAll = () =>
  fetch(`${process.env.NEXT_PUBLIC_API_URL}/organisations`, {
    credentials: "include",
  }).then((res) => res.json());
