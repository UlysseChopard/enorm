const { hash } = require("../utils/auth");
const log = require("../utils/logs");
const Users = require("../models/users");

exports.logout = (req, res, next) => {
  req.logout((err) => (err ? next(err) : res.redirect("/")));
};

exports.signup = async (req, res, next) => {
  const password = await hash(req.body.password);
  const {
    query: { role },
    body: { email },
  } = req;
  try {
    await Users.create({
      email,
      role,
      password,
    });
    req.login({ email, role }, (err) => {
      if (err) return next(err);
      res.redirect("/dashboard");
    });
  } catch (err) {
    next(err);
  }
};
