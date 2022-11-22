const errors = require("../middlewares/errors");
const catchAll = require("../middlewares/catch-all");
const { isAuthenticated } = require("../middlewares/auth");

const accounts = require("./accounts");
const relations = require("./relations");
const passwords = require("./passwords");

module.exports = (app) => {
  app.use("/api/accounts", accounts);
  app.use("/api/relations", isAuthenticated, relations);
  app.use("/api/passwords", isAuthenticated, passwords);
  app.use("*", catchAll);
  app.use(errors);
};
