import { logout } from "lib/api/auth";
import Button from "./Button";
import { AiOutlineLogout } from "@react-icons/all-files/ai/AiOutlineLogout";
import { useCallback } from "react";
import { useRouter } from "next/router";

const Logout = () => {
  const router = useRouter();
  const handleClick = useCallback((e) => {
    e.preventDefault();
    router.push("/login");
    logout();
  }, []);
  return (
    <Button onClick={handleClick} title="Logout">
      <AiOutlineLogout />
    </Button>
  );
};

export default Logout;
