export const signup = ({
  firstName,
  lastName,
  email,
  civility,
  phoneNumber,
  password,
}) =>
  fetch("http://localhost:4000/api/signup/managers", {
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
