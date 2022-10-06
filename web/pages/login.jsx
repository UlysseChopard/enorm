import { LoginForm } from "components/pages/login";
import Head from "next/head";
import LoginLayout from "components/layout/Login";

const Login = () => {
  return (
    <>
      <Head>
        <title>Log in</title>
      </Head>
      <LoginForm />
    </>
  );
};

Login.Layout = LoginLayout;

export default Login;
