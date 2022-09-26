const handleNavigation =
  (displayFunction, ...rest) =>
  (e) => {
    const parent = document.querySelector("main");
    const previousApp = document.getElementById("app");
    if (previousApp) {
      parent.removeChild(document.getElementById("app"));
    }
    displayFunction(parent, ...rest);
  };

export default handleNavigation;
