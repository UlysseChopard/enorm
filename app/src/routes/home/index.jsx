import { NavLink, Outlet, redirect } from "react-router-dom";
import SwitchLng from "@/components/SwitchLng";
import { getStatus } from "@/api/sessions";
import { useTranslation } from "react-i18next";

export async function loader() {
  console.log("called")
  const res = await getStatus();
  console.log("res", await res.json())
  if (!res.ok) return redirect("/login");
}

const linkStyle = ({ isActive }) => isActive ? "font-bold mx-4" : "mx-4";

export default function Home() {
  const { t } = useTranslation(null, { keyPrefix: "home" });
  return (
    <div id="root">
      <div
        id="app-banner"
        className="h-12 bg-slate-200 flex items-center justify-between"
      >
        <h1 className="text-2xl font-bold mx-4">{t("brandname")}</h1>
        <div id="account">
          <NavLink to="account" className={linkStyle}>{t("account")}</NavLink>
          <NavLink to="logout" className={linkStyle}>{t("logout")}</NavLink>
        </div>
      </div>
      <div id="content" className="flex">
        <div
          id="sidebar"
          className="h-screen bg-sky-700 text-white flex flex-col p-4 width-48"
        >
          <NavLink to="roles" className={linkStyle}>{t("roles")}</NavLink>
        </div>
        <div id="main" className="w-full mx-4 h-screen">
          <Outlet />
        </div>
      </div>
      <footer className="h-32 bg-sky-900 flex items-center justify-center">
        <SwitchLng />
      </footer>
    </div>
  );
}
