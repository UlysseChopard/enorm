import Head from "next/head";
import { RolesButtons } from "components/pages/roles";
import LoginLayout from "components/layout/Login";
import useUser from "lib/hooks/useUser";
import { useRouter } from "next/router";
import { useEffect } from "react";

const Roles = () => {
  const { user, isError, isLoading } = useUser();
  const router = useRouter();

  if (isError) {
    return <p>An error occurred, please retry</p>;
  }

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (user.isExpert && !user.isManager) {
    router.replace("/dashboard/expert");
  } else if (user.isManager && !user.isExpert) {
    router.replace("/dashboard/manager");
  }

  return (
    <>
      <Head>
        <title>Select your role</title>
        {JSON.stringify(user)}
      </Head>
      <RolesButtons />
    </>
  );
};

Roles.Layout = LoginLayout;

export default Roles;
