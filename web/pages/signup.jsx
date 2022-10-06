import { SignupForm } from "components/pages/signup";
import Head from "next/head";
import LoginLayout from "components/layout/Login";

const Signup = () => {
  return (
    <>
      <Head>
        <title>Sign up</title>
      </Head>
      <SignupForm />
    </>
  );
};

Signup.Layout = LoginLayout;

export default Signup;
