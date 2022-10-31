import { redirect } from "react-router-dom";
import { logout } from "../api/accounts";

export async function loader() {
  try {
    const res = await logout();
    if (!res.ok) console.error(res);
    else {
      return redirect("/login");
    }
  } catch (err) {
    return err;
  }
}

export default function Logout() {
  return <p>Logging out...</p>;
}
