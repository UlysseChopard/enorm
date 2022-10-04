const errors = require("../middlewares/errors");
const catchAll = require("../middlewares/catch-all");
const { isAuthenticated } = require("../middlewares/auth");

const auth = require("./auth");

module.exports = (app) => {
  app.use("/api", auth);
  app.use("/secret", isAuthenticated, (_req, res) => res.send("Auth success"));
  app.use("*", catchAll);
  app.use(errors);
};
