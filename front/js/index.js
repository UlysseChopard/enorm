const displayTemplate = templateName => {
    const templatePlace = document.querySelector("main.template-place");
    while (templatePlace.firstChild) {
        templatePlace.removeChild(templatePlace.lastChild);
    }
    templatePlace.appendChild(templateName);
};

document
  .querySelectorAll("nav.nav-main > li")
  .forEach(link => {
      link.addEventListener("click", e => {
          displayTemplate(e.target.id);
      });
  })