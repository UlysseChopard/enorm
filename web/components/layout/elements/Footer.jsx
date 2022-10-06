import Link from "next/link";

const Footer = () => {
  return (
    <footer className="flex h-24 w-full items-center justify-center border-t bg-sky-700 text-white">
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
  );
};
export default Footer;
