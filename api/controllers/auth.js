const log = require("../utils/logs");
const Users = require("../models/users");
const { hash } = require("../utils/auth");

exports.logout = (req, res, next) => {
  req.logout((err) => (err ? next(err) : res.sendStatus(200)));
};

exports.login = (req, res) => res.json({ user: req.user });

exports.sendUser = (req, res) => {
  res.json({ user: req.user });
};

exports.signup = async (req, res, next) => {
  try {
    const { uuid } = res.locals;
    const { email, firstname, lastname, civility, phonenumber } = req.body;
    const password = await hash(req.body.password);
    const {
      rows: [user],
    } = await Users.createAccount({
      email,
      firstname,
      lastname,
      civility,
      phonenumber,
      password,
      uuid,
    });
    req.login(user, (err) => {
      if (err) return next(err);
      log.info("Account created", { user });
      res.sendStatus(201);
    });
  } catch (err) {
    next(err);
  }
};

exports.activateAccount = async (req, res, next) => {
  try {
    const {
      rows: [user],
    } = await Users.getByUUID(req.params.uuid);
    if (!user) res.sendStatus(401);
    res.sendStatus(200);
  } catch (err) {
    next(err);
  }
};
