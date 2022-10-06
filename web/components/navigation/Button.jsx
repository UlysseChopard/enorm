import Link from "next/link";

const Button = ({ onClick, children }) => (
  <div className="rounded-full w-8 h-8 text-center leading-8 border bg-slate-200 hover:text-white hover:bg-slate-600 focus:bg-slate-600">
    <button
      type="button"
      onClick={onClick}
      className="relative bottom-0.5 text-xl"
    >
      {children}
    </button>
  </div>
);

const PolyvalentButton = ({ children, href, onClick }) => {
  if (href) {
    <Link href={href}>
      <Button>{children}</Button>
    </Link>;
  }
  return <Button onClick={onClick}>{children}</Button>;
};

export default PolyvalentButton;
