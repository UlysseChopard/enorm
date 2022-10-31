const log = require("../utils/logs");
const Users = require("../models/users");
const { hash } = require("../utils/auth");
const { v4: uuidv4 } = require("uuid");
const { sendVerification } = require("../utils/emails");

exports.logout = (req, res, next) => {
  req.logout((err) => (err ? next(err) : res.sendStatus(200)));
};

exports.sendUser = (req, res) => {
  res.json({ user: req.user });
};

exports.login = (_req, res) => res.sendStatus(200);

exports.signup = async (req, res, next) => {
  try {
    const uuid = uuidv4();
    sendVerification({
      to: req.body.email,
      link: `${process.env.WEB_URL}/confirm/${uuid}`,
    });
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
    } = await Users.activateAccount(req.params.uuid);
    console.log(user);
    if (!user) return res.sendStatus(401);
    res.sendStatus(200);
  } catch (err) {
    next(err);
  }
};

exports.deleteAccount = async (req, res, next) => {
  try {
    await Users.deleteAccount(req.user.id);
    res.logout();
  } catch (err) {
    next(err);
  }
};
