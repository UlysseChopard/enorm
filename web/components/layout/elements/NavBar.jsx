import Home from "components/navigation/Home";
import Logout from "components/navigation/Logout";

const NavBar = ({ bgColor = "bg-white", accountManagement = true }) => {
  return (
    <div className={`sticky z-10 top-0 w-full h-16 drop-shadow flex items-center justify-around ${bgColor}`}>
      <div />
      <Home />
      {accountManagement ? <Logout />: <div /> }
    </div>
  );
};

export default NavBar;
