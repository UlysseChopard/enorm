import Main from "./elements/Main";
import NavBar from "./elements/NavBar";
import Footer from "./elements/Footer";

const Default = ({ children }) => {
  return (
    <>
      <NavBar accountManagement={false} />
      <Main>{children}</Main>
      <Footer />
    </>
  );
};

export default Default;
