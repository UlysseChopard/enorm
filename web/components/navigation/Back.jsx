import { useRouter } from "next/router";
import Button from "./Button";
import { AiFillCaretLeft } from "@react-icons/all-files/ai/AiFillCaretLeft";

const Back = () => {
  const router = useRouter();
  return (
    <Button onClick={router.back} title={"Back"}>
      <AiFillCaretLeft />
    </Button>
  );
};

export default Back;
