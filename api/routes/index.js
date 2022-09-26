const accounts = require("./accounts");
const views = require("./views");

module.exports = (app) => {
  app.use("/", views);
  app.use("/accounts", accounts);
};
