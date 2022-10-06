import { logout } from "lib/api/auth";
import Button from "./Button";
import { AiOutlineLogout } from "@react-icons/all-files/ai/AiOutlineLogout";

const Logout = () => {
  return (
    <Button onClick={logout} title="Logout">
      <AiOutlineLogout />
    </Button>
  );
};

export default Logout;
