import { useEffect, useState } from "react";

export default function Button({ onClick, label, description, role = "" }) {
  const [bgColor, setBgColor] = useState("");
  useEffect(() => {
    if (role === "manager") {
      setBgColor("bg-red-200");
    } else if (role === "expert") {
      setBgColor("bg-blue-200");
    }
  }, [role]);
  return (
    <button
      type="button"
      onClick={onClick}
      className={`m-6 w-96 rounded-xl border p-6 text-left hover:opacity-80 focus:opacity-80 ${bgColor}`}
    >
      <h3 className="text-2xl font-bold">{label} &rarr;</h3>
      <p className="mt-4 text-xl">{description}</p>
    </button>
  );
}
