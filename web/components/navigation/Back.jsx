import { useRouter } from "next/router";
import Button from "./Button";

const Back = () => {
  const router = useRouter();
  return <Button onClick={router.back}>&larr;</Button>;
};

export default Back;
