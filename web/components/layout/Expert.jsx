import Main from "./elements/Main";
import NavBar from "components/navigation/NavBar";
import Footer from "./elements/Footer";
import Auth from "./elements/Auth";

const Expert = ({ children }) => {
  return (
    <>
      <NavBar backBtn={true} accountManagement={true} />
      <Main bgColor="bg-sky-100">
        <Auth>{children}</Auth>
      </Main>
      <Footer />
    </>
  );
};

export default Expert;
