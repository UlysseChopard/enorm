import Button from "./Button";
import { AiOutlineMenu } from "@react-icons/all-files/ai/AiOutlineMenu";

const Menu = ({ onClick }) => {
  return <Button onClick={onClick} title="Navigation" icon={AiOutlineMenu} />;
};

export default Menu;
