import Button from "./Button";
import { GrUserExpert } from "@react-icons/all-files/gr/GrUserExpert";

const Expert = () => {
  return (
    <Button href="/dashboard/expert" title="Expert dashboard">
      <GrUserExpert />
    </Button>
  );
};

export default Expert;
