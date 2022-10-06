import Main from "./elements/Main";
import NavBar from "components/navigation/NavBar";
import Footer from "./elements/Footer";

const Default = ({ children }) => {
  return (
    <>
      <NavBar backBtn={true} accountManagement={false} />
      <Main>{children}</Main>
      <Footer />
    </>
  );
};

export default Default;
