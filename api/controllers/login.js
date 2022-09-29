const db = require("../db");
const { hash } = require("../utils/auth");
const log = require("../utils/logs");
const Users = require("../models/users");

exports.login = (req, res) => res.send(req.user);

exports.logout = (req, res, next) => {
  req.logout((err) => (err ? next(err) : res.redirect("/")));
};

exports.signup = async (req, res, next) => {
  const password = await hash(req.body.password);
  console.log(password.toString());
  try {
    await Users.create({
      email: req.body.email,
      role: req.body.role,
      password,
    });
    req.login({ email, username }, async (err) => {
      if (err) return next(err);
      res.redirect("/dashboard");
    });
  } catch (err) {
    next(err);
  }
};

exports.getMe = (req, res) => {
  log.info({ user: req.user });
  res.send("here");
};
