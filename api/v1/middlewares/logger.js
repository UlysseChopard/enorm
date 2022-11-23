const log = require("../utils/logs");

module.exports = (req, res, next) => {
  if (process.env.NODE_ENV !== "production") {
    log.info({ req, res, body: req.body });
  }
  next();
};
