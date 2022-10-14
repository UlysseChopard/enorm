import Link from "next/link";
import { useEffect, useState } from "react";

const Button = ({ onClick, label, description, href, role }) => {
  const [bgColor, setBgColor] = useState("");
  useEffect(() => {
    if (role === "manager") {
      setBgColor("bg-red-200");
    } else if (role === "expert") {
      setBgColor("bg-sky-200");
    } else {
      setBgColor("bg-white");
    }
  }, [role]);
  const className = `drop-shadow m-6 w-96 rounded-xl border p-6 text-left hover:opacity-80 focus:opacity-80 ${bgColor}`;

  if (href) {
    return (
      <Link href={href}>
        <button type="button" className={className}>
          <h3 className="text-2xl font-bold">{label} &rarr;</h3>
          <p className="mt-4 text-xl">{description}</p>
        </button>
      </Link>
    );
  }
  return (
    <button type="button" onClick={onClick} className={className}>
      <h3 className="text-2xl font-bold">{label} &rarr;</h3>
      <p className="mt-4 text-xl">{description}</p>
    </button>
  );
};

export default Button;
