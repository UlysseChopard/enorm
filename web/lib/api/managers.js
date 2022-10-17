export const signup = ({
  firstName,
  lastName,
  email,
  civility,
  phoneNumber,
  password,
}) =>
  fetch(`${process.env.NEXT_PUBLIC_API_URL}/signup/managers`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify({
      firstName,
      lastName,
      civility,
      phoneNumber,
      email,
      password,
    }),
  });
