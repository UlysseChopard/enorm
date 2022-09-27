const errors = require("../middleware/errors");
const login = require("./login");
const views = require("./views");

module.exports = (app) => {
  app.use("/", views);
  app.use("/login", login);
  app.use("/restricted", (req, res) => res.send(req.user));
  app.use(errors);
};
