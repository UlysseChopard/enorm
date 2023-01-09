import { Outlet, redirect } from "react-router-dom";
import { getStatus } from "@/api/sessions";
import LeftNavbar from "@/components/LeftNavbar";

export async function loader() {
  const res = await getStatus();
  if (!res.ok) return redirect("/login");
  return res.json();
}

export default function Home() {
  return (
    <div>
      <LeftNavbar />
      <Outlet />
    </div>
  );
}
