import Link from "next/link";

const Anchor = ({ href, children }) => {
  return (
    <Link href={href}>
      <a className="flex justify-center items-center w-full h-full">
        {children}
      </a>
    </Link>
  );
};

const Button = ({ onClick, title, children }) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className="flex justify-center items-center w-full h-full"
      title={title}
    >
      {children}
    </button>
  );
};

const PolyvalentButton = ({ href, onClick, title, children }) => {
  return (  <div className="rounded-full w-8 h-8 text-center leading-8 border bg-white drop-shadow hover:text-white hover:bg-slate-600 focus:bg-slate-600">
    {href ? <Anchor href={href}>{children}</Anchor> : <Button onClick={onClick} title={title}>{children}</Button>}
  </div>
  )
};

export default PolyvalentButton;
