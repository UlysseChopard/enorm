import Back from "./Back";
import Home from "./Home";
import Logout from "./Logout";
import Manager from "./Manager";
import Expert from "./Expert";

const NavBar = ({ backBtn = true, accountManagement = true }) => {
  return (
    <div className="sticky z-10 bg-white top-0 w-full h-16 border-b-2 flex items-center justify-around">
      {backBtn ? <Back /> : <div />}
      <Home />
      {accountManagement ? (
        <div className="flex items-center justify-around w-32">
          <Expert />
          <Manager />
          <Logout />
        </div>
      ) : (
        <div />
      )}
    </div>
  );
};

export default NavBar;
