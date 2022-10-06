import Head from "next/head";
import { RolesButtons } from "components/pages/roles";
import { useEffect, useState } from "react";
import { getUser } from "lib/api/auth";

const Roles = () => {
  const [user, setUser] = useState({});
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const user = await getUser();
        setUser(user);
      } catch (err) {
        setUser(err.message);
      }
    };
    fetchUser();
  }, []);
  return (
    <>
      <Head>
        <title>Select your role</title>
      </Head>
      <RolesButtons />
      <code>{JSON.stringify(user, null, 2)}</code>
    </>
  );
};

export default Roles;
