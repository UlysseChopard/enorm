const errors = require("../middlewares/errors");
const auth = require("./auth");
const views = require("./views");
const api = require("./api");

module.exports = (app) => {
  app.use("/", views);
  app.use("/auth", auth);
  app.use("/api", api);
  app.use(errors);
};
