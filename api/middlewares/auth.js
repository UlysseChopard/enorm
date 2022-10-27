const log = require("../utils/logs");
const { sendVerification } = require("../utils/emails");
const { v4: uuidv4 } = require("uuid");

exports.sendEmailConfirmation = (req, res, next) => {
  const uuid = uuidv4();
  res.locals.uuid = uuid;
  try {
    sendVerification({
      to: req.user.email,
      link: `${process.env.WEB_URL}/confirm/${uuid}`,
    });
    next();
  } catch (err) {
    next(err);
  }
};

exports.isAuthenticated = (req, res, next) => {
  const isActivated = req.user?.is_activated;
  log.info("auth", {
    isAuthenticated: req.isAuthenticated(),
    isActivated,
  });
  isActivated ? next() : res.sendStatus(401);
};
