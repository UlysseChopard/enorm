const createThead = (...titles) => {
  const tr = document.createElement("tr");
  titles.forEach((title) => {
    const head = document.createElement("th");
    head.textContent = title;
    console.log("head", head);
    tr.appendChild(head);
  });
  console.log("trhead", tr);
  return tr;
};

const createRow = (row) => {
  const tr = document.createElement("tr");
  row.forEach((value) => {
    const td = document.createElement("td");
    td.textContent = value;
    tr.appendChild(td);
  });
  console.log("tr", tr);
  return tr;
};

const createRows = (parent, ...rows) => {
  rows.forEach((row) => parent.appendChild(createRow(row)));
};

const displayExpertPage = (parent, api) => {
  // Test values

  fetch(api)
    .then((experts) => {
      const expertApp = document.createElement("table");
      expertApp.id = "app";
      const thead = document.createElement("thead");
      thead.appendChild(createThead(...heads));
      const tbody = document.createElement("tbody");
      createRows(tbody, ...rows);
      expertApp.append(thead, tbody);
      parent.appendChild(expertApp);
    })
    .catch(console.error);
};

export default displayExpertPage;
