const errors = require("../middlewares/errors");
const auth = require("./auth");
const views = require("./views");

module.exports = (app) => {
  app.use("/", views);
  app.use("/auth", auth);
  app.use(errors);
};
