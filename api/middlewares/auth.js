const log = require("../utils/logs");

exports.isAuthenticated = (req, res, next) => {
  log.info({ isAuthenticated: req.isAuthenticated(), user: req.user });
  req.isAuthenticated() ? next() : res.sendStatus(401);
};
