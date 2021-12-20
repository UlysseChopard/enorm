const displayHomePage = (parent) => {
  const homeApp = document.createElement("p");
  homeApp.id = "app";
  //  Test data
  homeApp.textContent = "Lorem ipsum...";
  parent.appendChild(homeApp);
};

export default displayHomePage;
