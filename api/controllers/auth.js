const { hash } = require("../utils/auth");
const log = require("../utils/logs");
const Users = require("../models/users");

exports.logout = (req, res, next) => {
  req.logout((err) => (err ? next(err) : res.sendStatus(200)));
};

exports.signup = async (req, res, next) => {
  const password = await hash(req.body.password);
  const { roles, email, firstName, lastName } = req.body;
  try {
    const {
      rows: [user],
    } = await Users.create({
      roles,
      email,
      firstName,
      lastName,
      password,
    });
    req.login(user, (err) => {
      if (err) return next(err);
      log.info("User created", { user });
      res.sendStatus(201);
    });
  } catch (err) {
    log.warn({ err });
    res.sendStatus(500);
  }
};

exports.login = (req, res) => res.status(200).json({ user: req.user });
