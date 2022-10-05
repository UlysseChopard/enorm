const log = require("../utils/logs");
exports.getUser = (req, res) => {
  log.info({ req });
  res.json({ user: req?.user, session: req.session });
};
