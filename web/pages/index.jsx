import Head from "next/head";
import Button from "components/forms/Button";
import Main from "components/layout/Root";

const Home = () => {
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
          <Button label="Sign up" href="/signup?isManager=true" />
        </div>
      </Main>
    </>
  );
};

export default Home;
