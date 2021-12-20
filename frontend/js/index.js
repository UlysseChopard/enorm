import configApi from "./config/api.js";

import handleNavigation from "./utils/navigation.js";
import attachEventListener from "./utils/listeners.js";

import * as page from "./pages.js";

attachEventListener({
  elementId: "homePage",
  events: ["clic", "dbclick"],
  cb: handleNavigation(page.displayHomePage),
});

attachEventListener({
  elementId: "expertPage",
  events: ["click", "dblclick"],
  cb: handleNavigation(page.displayExpertPage, configApi.experts),
});

attachEventListener({
  elementId: "sessionPage",
  events: ["click", "dblclick"],
  cb: () => {},
});

// document
//   .getElementById("homePage")
//   .addEventListener("click", handleNavigation(page.displayHomePage));

// document
//   .getElementById("expertPage")
//   .addEventListener(
//     "click",
//     handleNavigation(page.displayExpertPage, configApi.experts)
//   );

// document.getElementById("authPage").addEventListener("click");
