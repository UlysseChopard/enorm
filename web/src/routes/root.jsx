import React, { useState } from "react";
import { redirect, Outlet, useLoaderData, Link } from "react-router-dom";
import { getUser } from "../api/user.js";

export async function loader() {
  const user = await getUser();
  // if (!user) return redirect("/login");
  return { user };
}

const Root = () => {
  const { user } = useLoaderData();
  const [sidebar, setSidebar] = useState(false);
  console.log("usr", user, sidebar.current);
  return (
    <div id="root">
      <div
        id="app-banner"
        className="h-12 bg-slate-200 flex items-center justify-between"
      >
        <div className="mx-4">
          <button onClick={() => setSidebar(!sidebar)} className="mx-auto">
            Sidebar
          </button>
        </div>
        <h1 className="text-2xl font-bold">E-norm</h1>
        <div />
      </div>
      <div
        id="sidebar"
        className={`fixed left-0 h-screen bg-slate-700 text-white flex flex-col p-4 ${
          sidebar ? "" : "hidden"
        }`}
      >
        <Link>Lien 1</Link>
        <Link>Lien 2</Link>
        <Link>Lien 3</Link>
      </div>
      <div id="main">
        <Outlet />
      </div>
    </div>
  );
};

export default Root;
