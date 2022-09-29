const path = require("path");

module.exports = (app) => {
  app.locals.basedir = app.get("views");
  app.set("view engine", "pug");
  app.set("views", path.join(__dirname, "../views"));
};
