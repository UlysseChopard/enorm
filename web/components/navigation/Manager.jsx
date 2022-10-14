import Button from "./Button";
import { FaUserTie } from "@react-icons/all-files/fa/FaUserTie";

const Manager = () => {
  return (
    <Button href="/dashboard/manager" title="Manager dashboard">
      <FaUserTie />
    </Button>
  );
};

export default Manager;
