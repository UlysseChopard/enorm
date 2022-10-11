const log = require("../utils/logs");

exports.isAuthenticated = (req, res, next) => {
  log.info({ isAuthenticated: req.isAuthenticated() });
  req.isAuthenticated() ? next() : res.sendStatus(401);
};
