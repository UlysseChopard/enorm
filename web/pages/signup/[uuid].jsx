import ExpertSignupForm from "components/pages/signup/experts";
import Head from "next/head";
import LoginLayout from "components/layout/Login";
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
        uuid={router.query.uuid}
      />
    </>
  );
};

Signup.Layout = LoginLayout;

export default Signup;
