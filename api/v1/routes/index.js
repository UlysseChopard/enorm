const errors = require("../middlewares/errors");
const catchAll = require("../middlewares/catch-all");
const { isAuthenticated } = require("../middlewares/auth");

const accounts = require("./accounts");
const organisations = require("./organisations");
const roles = require("./roles");

module.exports = (app) => {
  app.use("/api/accounts", accounts);
  app.use("/api/organisations", isAuthenticated, organisations);
  app.use("/api/roles", isAuthenticated, roles);
  app.use("*", catchAll);
  app.use(errors);
};
