import Back from "./Back";
import Home from "./Home";
import Logout from "./Logout";
import Roles from "./Roles";
const NavBar = () => {
  return (
    <div className="absolute top-0 left-0 right-0 border-b flex items-center justify-around">
      <Back />
      <Home />
      <Logout />
      <Roles />
    </div>
  );
};

export default NavBar;
