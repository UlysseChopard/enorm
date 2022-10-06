const errors = require("../middlewares/errors");
const catchAll = require("../middlewares/catch-all");
const { isAuthenticated } = require("../middlewares/auth");

const auth = require("./auth");
const users = require("./users");
const organisations = require("./organisations");
const experts = require("./experts");

module.exports = (app) => {
  app.use("/api", auth);
  app.use("/api", users);
  app.use("/api", organisations);
  app.use("/api", experts);
  app.use("*", catchAll);
  app.use(errors);
};
