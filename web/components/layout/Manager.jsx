import Main from "./elements/Main";
import NavBar from "components/navigation/NavBar";
import Footer from "./elements/Footer";

const Default = ({ children }) => {
  return (
    <>
      <NavBar backBtn={true} accountManagement={true} />
      <Main bgColor="bg-red-100">{children}</Main>
      <Footer />
    </>
  );
};

export default Default;
