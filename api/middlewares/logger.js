const { log } = require("utils");
const { v4: uuidV4 } = require("uuid");

module.exports = (req, res, next) => {
  req.log = log.child({ req_id: uuidV4() }, true);
  req.log.info({ req });
  res.on("finish", () => req.log.info({ res }));
  next();
};

