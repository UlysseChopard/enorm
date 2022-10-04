import Link from "next/link";

export const Anchor = ({ href="/", label, children, color="blue", bgColor="white"}) => (
  <Link
    href={href}
  >
    <a className={`m-6 w-96 rounded-xl border p-6 text-left hover:text-${color}-600 focus:text-${color}-600 bg-${bgColor}-200`} >
      <h3 className="text-2xl font-bold">{label} &rarr;</h3>
      <p className="mt-4 text-xl">{children}</p>
    </a>
  </Link>
);