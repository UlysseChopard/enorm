import Head from "next/head";
import Button from "components/forms/Button";
import Main from "components/layout/Root";
import useUser from "lib/hooks/useUser";
import { useRouter } from "next/router";

const Home = () => {
  const { user } = useUser();
  const router = useRouter();
  if (user) {
    if (user.is_manager) {
      router.replace("/dashboard/manager");
    } else if (user.is_expert) {
      router.replace("/dashboard/expert");
    }
  }
  return (
    <>
      <Head>
        <title>E-norm</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Main>
        <h1 className="text-6xl font-bold">Welcome to E-norm</h1>

        <div className="my-6 flex max-w-4xl flex-wrap items-center justify-around sm:w-full">
          <Button label="Log in" href="/login" />
          <Button label="Sign up" href="/signup" />
        </div>
      </Main>
    </>
  );
};

export default Home;
