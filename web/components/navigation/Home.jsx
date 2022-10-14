import Link from "next/link";

const Home = () => {
  return (
    <Link href="/">
      <button className="text-4xl font-bold" title="Home">
        E-norm
      </button>
    </Link>
  );
};

export default Home;
