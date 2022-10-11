import ExpertSignupForm from "components/pages/signup/experts";
import Head from "next/head";
import LoginLayout from "components/layout/Login";
import Link from "next/link";
import { useRouter } from "next/router";

const Signup = () => {
  const router = useRouter();
  return (
    <>
      <Head>
        <title>Sign up</title>
      </Head>
      <ExpertSignupForm
        onSuccess={() => router.replace("/dashboard/expert")}
        onCancel={() => router.push("/")}
        id={router.query.id}
      />
    </>
  );
};

Signup.Layout = LoginLayout;

export default Signup;
