import React, { useRef } from "react";
import { redirect, Outlet, useLoaderData } from "react-router-dom";
import { getUser } from "../api/user.js";

export async function loader() {
  const user = await getUser();
  // if (!user) return redirect("/login");
  return { user };
}

const Root = () => {
  const { user } = useLoaderData();
  const sidebar = useRef(false);
  console.log("usr", user, sidebar.current);
  return (
    <>
      <div
        id="sidebar"
        className={`fixed left-0 h-screen bg-slate-100 ${
          sidebar.current ? "w-32" : ""
        }`}
      >
        <button onClick={() => (sidebar.current = !sidebar.current)}>
          Sidebar
        </button>
      </div>
      <div id="main">
        <Outlet />
      </div>
    </>
  );
};

export default Root;
