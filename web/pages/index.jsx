import Head from 'next/head';
import Link from 'next/link';
import { Anchor } from "components/pages/home";
import Main from "components/layout/Main";

const Home = () => {
  return (
    <>
      <Head>
        <title>E-norm</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Main>
        <h1 className="text-6xl font-bold">
          Welcome to E-norm
        </h1>

        <div className="mt-6 flex max-w-4xl flex-wrap items-center justify-around sm:w-full">
          <Anchor href="/manager/login" label="Manager dashboard" bgColor="red" />
          <Anchor href="/expert/login" label="Expert dashboard" bgColor="blue" />
          <Anchor href="/signup" label="Sign up" />
        </div>
      </Main>

      <footer className="flex h-24 w-full items-center justify-center border-t">
        <Link href="/e-norm">
          <a
            className="flex items-center justify-center gap-2"
            target="_blank"
            rel="noopener noreferrer"
            >
            E-norm since 2022
          </a>
        </Link>
      </footer>
    </>
  )
}

export default Home
