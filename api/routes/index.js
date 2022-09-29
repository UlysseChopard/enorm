const errors = require("../middlewares/errors");
const login = require("./login");
const views = require("./views");

module.exports = (app) => {
  app.use("/", views);
  app.use("/auth", login);
  app.use(errors);
};
