import Button from "./Button";
import { FaUserTie } from "@react-icons/all-files/fa/FaUserTie";
import { GrUserExpert } from "@react-icons/all-files/gr/GrUserExpert";

const Roles = () => {
  return (
    <>
      <Button href="/manager" title="Manager dashboard">
        <FaUserTie />
      </Button>
      <Button href="/expert" title="Expert dashboard">
        <GrUserExpert />
      </Button>
    </>
  );
};

export default Roles;
