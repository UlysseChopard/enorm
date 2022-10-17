const log = require("../utils/logs");

exports.isAuthenticated = (req, res, next) => {
  const isActivated = req.user?.is_activated;
  log.info("auth", {
    isAuthenticated: req.isAuthenticated(),
    isActivated,
  });
  isActivated ? next() : res.sendStatus(401);
};
