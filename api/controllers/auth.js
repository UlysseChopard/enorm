const { v4: uuidv4 } = require("uuid");
const log = require("../utils/logs");
const Users = require("../models/users");
const { hash } = require("../utils/auth");
const { sendVerification } = require("../utils/emails");

exports.sendEmailConfirmation = (req, res) => {
  try {
    sendVerification({
      to: req.user.email,
      link: `${process.env.WEB_URL}/confirm/${req.user.uuid}`,
    });
    res.sendStatus(201);
  } catch (err) {
    next(err);
  }
};

exports.logout = (req, res, next) => {
  req.logout((err) => (err ? next(err) : res.sendStatus(200)));
};

exports.login = (req, res) => res.json({ user: req.user });

exports.sendUser = (req, res) => {
  res.json({ user: req.user });
};

exports.signupManager = async (req, _res, next) => {
  try {
    const { email, firstName, lastName, phoneNumber, civility } = req.body;
    const password = await hash(req.body.password);
    const uuid = uuidv4();
    const {
      rows: [user],
    } = await Users.createManagerAccount({
      email,
      firstName,
      lastName,
      phoneNumber,
      civility,
      password,
      uuid,
    });
    req.login(user, (err) => {
      if (err) return next(err);
      log.info("Manager account created", { user });
      next();
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
  try {
    await Users.activateManagerAccount(req.user.id);
    next();
  } catch (err) {
    next(err);
  }
};
