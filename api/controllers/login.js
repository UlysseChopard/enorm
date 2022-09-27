const db = require("../db");
const { hash } = require("../utils/auth");
const log = require("../utils/logs");
const passport = require("passport");

exports.login = (req, res) => res.send(req.user);

exports.logout = (req, res, next) => {
  req.logout((err) => (err ? next(err) : res.redirect("/")));
};

exports.signup = async (req, res, next) => {
  const { email, username } = req.body;
  const password = await hash(req.body.password);
  console.log(password.toString());
  try {
    await db.query(
      "INSERT INTO users (name, password, email) VALUES ($1, $2, $3)",
      [username, password, email]
    );
    req.login({ email, username }, (err) => {
      if (err) return next(err);
      res.redirect("/");
    });
  } catch (err) {
    next(err);
  }
};

exports.getMe = (req, res) => {
  log.info({ user: req.user });
  res.send("here");
};
