import Main from "./elements/Main";
import NavBar from "./elements/NavBar";
import Footer from "./elements/Footer";

const Expert = ({ children }) => {
  return (
    <>
      <NavBar bgColor="bg-sky-200" accountManagement={true} />
      <Main>
        {children}
      </Main>
      <Footer />
    </>
  );
};

export default Expert;
