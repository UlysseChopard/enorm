import Head from "next/head";
import Link from "next/link";
import Button from "components/forms/Button";
import Main from "components/layout/Main";

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
          <Link href="/login">
            <Button label="Log in" />
          </Link>
          <Link href="/signup">
            <Button href="/signup" label="Sign up" />
          </Link>
        </div>
      </Main>
    </>
  );
};

export default Home;
