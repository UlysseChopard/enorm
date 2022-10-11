export const fillProfile = (infos) =>
  fetch("http://localhost:4000/api/experts/description", {
    method: "PATCH",
    credentials: "include",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(infos),
  });

export const declareExpert = ({ email, organisation, manager }) =>
  fetch("http://localhost:4000/api/experts", {
    method: "POST",
    credentials: "include",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email,
      organisation,
      manager,
    }),
  });

export const activateAccount = (
  id,
  { firstName, lastName, civility, phoneNumber, password }
) =>
  fetch(`http://localhost:4000/api/signup/experts/${id}`, {
    method: "PATCH",
    credentials: "include",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      firstName,
      lastName,
      password,
      civility,
      phoneNumber,
    }),
  });
