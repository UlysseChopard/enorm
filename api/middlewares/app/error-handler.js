const { log } = require("utils");

module.exports = (err, req, res, next) => {
  const logger = log.child(null, true);
  logger.error({ err });
  if (res.headersSent) return next(err);
  res.status(500).json({ message: err.message });
};
