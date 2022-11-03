const path = require("path");
const errors = require("../middlewares/errors");
const catchAll = require("../middlewares/catch-all");
const { isAuthenticated } = require("../middlewares/auth");

const accounts = require("./accounts");
const organisations = require("./organisations");
const experts = require("./experts");
// const manager = require("./managers");

module.exports = (app, express) => {
  app.use(express.static(path.join(__dirname, "../public")));
  app.use("/api/accounts", accounts);
  app.use("/api/organisations", isAuthenticated, organisations);
  app.use("/api/experts", isAuthenticated, experts);
  // app.use("/api/managers", isAuthenticated, managers);
  app.use("*", catchAll);
  app.use(errors);
};
