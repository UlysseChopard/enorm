const { hash } = require("../utils/auth");
const log = require("../utils/logs");
const Users = require("../models/users");

exports.logout = (req, res, next) => {
  req.logout((err) => (err ? next(err) : res.sendStatus(200)));
};

exports.activateExpert = async (req, res, next) => {
  const { isExpert } = req.body;
  try {
    if (!isExpert) {
      return next();
    }
    const { firstName, lastName, phoneNumber, civility } = req.body;
    const password = await hash(req.body.password);
    const {
      rows: [user],
    } = await Users.activateExpertAccount(req.body.email, {
      firstName,
      lastName,
      phoneNumber,
      civility,
      password,
      isExpert,
    });
    req.login(user, (err) => {
      if (err) return next(err);
      log.info("Expert activated", { user });
      res.status(201).json({ user });
    });
  } catch (err) {
    next(err);
  }
};

exports.signupManager = async (req, res, next) => {
  try {
    const { email, firstName, lastName, phoneNumber, civility } = req.body;
    const password = await hash(req.body.password);
    const {
      rows: [user],
    } = await Users.createManagerAccount({
      email,
      firstName,
      lastName,
      phoneNumber,
      civility,
      password,
    });
    console.log(user);
    req.login(user, (err) => {
      if (err) return next(err);
      log.info("Manager account created", { user });
      res.status(201).json({ user });
    });
  } catch (err) {
    next(err);
  }
};

exports.login = (req, res) => res.json({ user: req.user });

exports.sendUser = (req, res) => {
  res.json({ user: req.user });
};
