export const login = ({ email, password }) => {
  return fetch(`${process.env.NEXT_PUBLIC_API_URL}/login`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email,
      password,
    }),
    credentials: "include",
  });
};

export const logout = () =>
  fetch(`${process.env.NEXT_PUBLIC_API_URL}/logout`, {
    method: "POST",
    credentials: "include",
  });
