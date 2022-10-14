export const fillProfile = (infos) =>
  fetch(`${process.env.NEXT_PUBLIC_API_URL}/experts/description`, {
    method: "PATCH",
    credentials: "include",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(infos),
  });

export const declareExpert = ({ email, organisation, manager }) =>
  fetch(`${process.env.NEXT_PUBLIC_API_URL}/experts`, {
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
  uuid,
  { firstName, lastName, civility, phoneNumber, password }
) =>
  fetch(`${process.env.NEXT_PUBLIC_API_URL}/signup/experts/${uuid}`, {
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
