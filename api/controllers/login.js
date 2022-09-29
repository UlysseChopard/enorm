const db = require("../db");
const { hash } = require("../utils/auth");
const log = require("../utils/logs");
const passport = require("passport");

exports.login = (req, res) => res.send(req.user);

exports.logout = (req, res, next) => {
  req.logout((err) => (err ? next(err) : res.redirect("/")));
};

exports.signup = async (req, res, next) => {
  const password = await hash(req.body.password);
  console.log(password.toString());
  try {
    await db.query(
      "INSERT INTO users (email, password, role) VALUES ($1, $2, $3)",
      [req.body.email, password, req.query.role]
    );
    req.login({ email, username }, async (err) => {
      if (err) return next(err);
      const { rows: users } = await db.query("SELECT * FROM users");
      res.render("dashboard", { user: req.body, users });
    });
  } catch (err) {
    next(err);
  }
};

exports.getMe = (req, res) => {
  log.info({ user: req.user });
  res.send("here");
};
