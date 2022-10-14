import { LoginForm } from "components/pages/login";
import Head from "next/head";
import LoginLayout from "components/layout/Login";
import Link from "next/link";

const Login = () => {
  return (
    <>
      <Head>
        <title>Log in</title>
      </Head>
      <LoginForm />
      <Link href="/signup">No account yet ?</Link>
    </>
  );
};

Login.Layout = LoginLayout;

export default Login;
