import { Outlet, useLoaderData } from "react-router-dom";
import { getUser } from "../api/user.js";

export async function loader() {
  const user = await getUser();
  return { user };
}

const Root = () => {
  const { user } = useLoaderData();
  return (
    <>
      <div id="sidebar">Sidebar</div>
      <div id="main">
        <Outlet />
      </div>
    </>
  );
};

export default Root;
