const errors = require("../middlewares/errors");
const catchAll = require("../middlewares/catch-all");
const { isAuthenticated } = require("../middlewares/auth");

const auth = require("./auth");
const organisations = require("./organisations");
const experts = require("./experts");

module.exports = (app) => {
  app.use("/api", auth);
  app.use("/api/organisations", isAuthenticated, organisations);
  app.use("/api/experts", isAuthenticated, experts);
  app.use("*", catchAll);
  app.use(errors);
};
