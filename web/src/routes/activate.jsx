import { redirect } from "react-router-dom";
import { activate } from "../api/accounts";

export async function loader({ params }) {
  console.log("activate");
  const res = await activate(params.uuid);
  if (res.ok) redirect("/");
}
export default function Activate() {
  return <p>Please activate your account</p>;
}
