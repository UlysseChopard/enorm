const log = require("../utils/logs");

module.exports = (err, _req, res, _next) => {
  log.error(err.stack);
  res.status(500).json({ error: err });
};
