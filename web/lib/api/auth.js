export const login = ({ email, password }) => {
  return fetch("http://localhost:4000/api/login", {
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
  fetch("http://localhost:4000/api/logout", { credentials: "include" });
