import handleNavigation from "./utils/navigation.js";
import displayExpertPage from "./experts.js";
import displayHomePage from "./about.js";

document
  .getElementById("homePage")
  .addEventListener("click", handleNavigation(displayHomePage));

document
  .getElementById("expertPage")
  .addEventListener("click", handleNavigation(displayExpertPage, expertsApi));
