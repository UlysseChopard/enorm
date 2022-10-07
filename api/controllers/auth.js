const { hash } = require("../utils/auth");
const log = require("../utils/logs");
const Users = require("../models/users");

exports.logout = (req, res, next) => {
  req.logout((err) => (err ? next(err) : res.sendStatus(200)));
};

exports.signup = async (req, res, next) => {
  const password = await hash(req.body.password);
  const {
    email,
    firstName,
    lastName,
    phoneNumber,
    civility,
    isExpert,
    isManager,
  } = req.body;
  log.info({ body: req.body });
  try {
    let user;
    if (isExpert) {
      const {
        rows: [expert],
      } = await Users.getByEmail(email);
      const {
        rows: [updatedExpert],
      } = await Users.activeAccount(expert.id, {
        firstName,
        lastName,
        phoneNumber,
        civility,
      });
      user = updatedExpert;
    } else if (isManager) {
      const {
        rows: [manager],
      } = await Users.createAccount({
        email,
        firstName,
        lastName,
        password,
        isExpert,
        isManager,
        phoneNumber,
        civility,
      });
      user = manager;
    }
    if (user) {
      req.login(user, (err) => {
        if (err) return next(err);
        log.info("User created", { user });
        res.status(201).json({ user });
      });
    } else {
      throw new Error("Bad request");
    }
  } catch (err) {
    next(err);
  }
};

exports.login = (req, res) => res.json({ user: req.user });

exports.sendUser = (req, res) => {
  res.json({ user: req.user });
};
