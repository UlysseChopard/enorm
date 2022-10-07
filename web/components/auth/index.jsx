import useUser from "lib/hooks/useUser";
import React, { Children } from "react";

const Auth = () => {
  const { user, isLoading, isError } = useUser();
  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (isError) {
    return <p>An error occurred, please try to log in</p>;
  }

  return <Children user={user} />;
};

export default Auth;
