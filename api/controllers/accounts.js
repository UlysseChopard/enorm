const { verify, hash } = require("../utils/auth");
const log = require("../utils/logs");
const Users = require("../models/users");
const { v4: uuidv4 } = require("uuid");
const { sendActivation: sendMail } = require("../utils/emails");

exports.sendAuthStatus = (req, res) =>
  res.sendStatus(req.isAuthenticated ? 200 : 401);

exports.update = async (req, res, next) => {
  try {
    await Users.updateAccount(req.user.id, req.body);
    res.sendStatus(200);
  } catch (err) {
    next(err);
  }
};

exports.updatePassword = async (req, res, next) => {
  try {
    const { oldpass, newpass } = req.body;
    const correctOldPass = await verify(oldpass, req.user.password);
    if (correctOldPass) {
      const newPassHashed = await hash(newpass);
      await Users.updatePassword(req.user.id, newPassHashed);
      res.sendStatus(200);
    } else {
      res.sendStatus(403);
    }
  } catch (err) {
    next(err);
  }
};

exports.logout = (req, res, next) => {
  req.logout((err) => (err ? next(err) : res.sendStatus(200)));
};

exports.sendUser = (req, res) => {
  res.json({
    email: req.user.email,
    firstname: req.user.first_name,
    lastname: req.user.last_name,
    civility: req.user.civility,
  });
};

exports.login = (_req, res) => res.sendStatus(200);

exports.sendActivation = async (req, res, next) => {
  try {
    await sendMail({ to: req.user.email, uuid: req.user.uuid });
    res.sendStatus(200);
  } catch (err) {
    next(err);
  }
};

exports.signup = async (req, res, next) => {
  try {
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
      uuid: uuidv4(),
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
    } = await Users.activateAccount(req.params.uuid);
    console.log(user);
    if (!user) return res.sendStatus(401);
    log.info("Activated account", { uuid: req.params.uuid });
    res.sendStatus(200);
  } catch (err) {
    next(err);
  }
};

exports.deleteAccount = async (req, res, next) => {
  try {
    await Users.deleteAccount(req.user.id);
    req.logout((err) => (err ? next(err) : res.sendStatus(200)));
  } catch (err) {
    next(err);
  }
};
