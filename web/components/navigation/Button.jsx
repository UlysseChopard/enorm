import Link from "next/link";

const Button = ({ onClick, title, children }) => (
  <div className="rounded-full w-8 h-8 text-center leading-8 border bg-slate-200 hover:text-white hover:bg-slate-600 focus:bg-slate-600">
    <button
      type="button"
      onClick={onClick}
      className="flex justify-center items-center w-full h-full"
      title={title}
    >
      {children}
    </button>
  </div>
);

const PolyvalentButton = ({ children, href, onClick, title }) => {
  if (href) {
    return (
      <Link href={href}>
        <Button title={title}>{children}</Button>
      </Link>
    );
  }
  return (
    <Button onClick={onClick} title={title}>
      {children}
    </Button>
  );
};

export default PolyvalentButton;
