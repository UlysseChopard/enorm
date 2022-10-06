import { logout } from "lib/api/auth";
import Button from "./Button";

const Logout = () => {
  return <Button onClick={logout}>Logout</Button>;
};

export default Logout;
