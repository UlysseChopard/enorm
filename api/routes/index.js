const errors = require("../middlewares/errors");
const catchAll = require("../middlewares/catch-all");
const { isAuthenticated } = require("../middlewares/auth");

const auth = require("./auth");
const views = require("./views");
const api = require("./api");

module.exports = (app) => {
  app.use("/", views);
  app.use("/", auth);
  app.use("/api", isAuthenticated, api);
  app.use("*", catchAll);
  app.use(errors);
};
