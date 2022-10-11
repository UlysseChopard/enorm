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

exports.activateExpert = async (req, res, next) => {
  try {
    const id = req.params.id;
    const { firstName, lastName, phoneNumber, civility } = req.body;
    const password = await hash(req.body.password);
    const {
      rows: [user],
    } = await Users.activateExpertAccount(id, {
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
