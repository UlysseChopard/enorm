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
    const { email, firstName, lastName, civility } = req.body;
    const password = await hash(req.body.password);
    const {
      rows: [user],
    } = await Users.createAccount({
      email,
      firstName,
      lastName,
      civility,
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

exports.activateExpert = async (req, res, next) => {
  try {
    const uuid = req.params.uuid;
    const { firstName, lastName, phoneNumber, civility } = req.body;
    const password = await hash(req.body.password);
    const {
      rows: [user],
    } = await Users.activateExpertAccount(uuid, {
      firstName,
      lastName,
      phoneNumber,
      civility,
      password,
    });
    req.login(user, (err) => {
      if (err) return next(err);
      log.info("Expert activated", { user });
      res.json({ user });
    });
  } catch (err) {
    next(err);
  }
};

exports.activateManager = async (req, _res, next) => {
  console.log("userId", req.user.id);
  try {
    await Users.activateManagerAccount(req.user.id);
    next();
  } catch (err) {
    next(err);
  }
};
