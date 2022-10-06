import Back from "./Back";
import Home from "./Home";
import Logout from "./Logout";
import Manager from "./Manager";
import Expert from "./Expert";

const NavBar = ({ noBack }) => {
  return (
    <div className="absolute top-0 left-0 right-0 h-16 border-b flex items-center justify-around">
      {noBack ? <div /> : <Back />}
      <Home />
      <div className="flex items-center justify-around w-32">
        <Expert />
        <Manager />
        <Logout />
      </div>
    </div>
  );
};

export default NavBar;
