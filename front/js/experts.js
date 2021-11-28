
const addExpert = ({ name, organisation }) => {
    // On vérifie si le navigateur prend en charge
    // l'élément HTML template en vérifiant la présence
    // de l'attribut content pour l'élément template.
    if ("content" in document.createElement("template")) {
    
        // On prépare une ligne pour le tableau
        var template = document.querySelector("#productrow");
      
        // On clone la ligne et on l'insère dans le tableau
        var tbody = document.querySelector("tbody");
        var clone = document.importNode(template.content, true);
        var td = clone.querySelectorAll("td");
        td[0].textContent = name.toString();
        td[1].textContent = organisation.toString();
      
        tbody.appendChild(clone);
      } else {
        // Une autre méthode pour ajouter les lignes
        // car l'élément HTML n'est pas pris en charge.
        return new Error("HTML Templates not availables on this navigator");
      }
};

const retrieveNewExpertData = () => {
    return {
        name: document.querySelector("input#name").value,
        organisation: document.querySelector("input#organisation").value
    }
};

document.querySelector("input[type=submit]").addEventListener("click", () => addExpert(retrieveNewExpertData()));