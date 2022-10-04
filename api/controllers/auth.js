const { hash } = require("../utils/auth");
const log = require("../utils/logs");
const Users = require("../models/users");

exports.logout = (req, res, next) => {
  req.logout((err) => (err ? next(err) : res.status(200)));
};

exports.signup = async (req, res, next) => {
  log.info({ body: req.body });
  const password = await hash(req.body.password);
  const { roles, email, firstName, lastName } = req.body;
  try {
    await Users.create({
      roles,
      email,
      firstName,
      lastName,
      password,
    });
    req.login({ email, firstName, lastName, roles }, (err) => {
      if (err) return next(err);
      log.info("User created", { user: req.body });
      res.status(201);
    });
  } catch (err) {
    log.warn({ err });
    res.status(500).json({ type: "error", message: err.message });
  }
};
