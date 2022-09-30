const Organisations = require("../models/organisations");

exports.home = async (req, res) => {
  res.render("index");
};

exports.signup = (req, res) =>
  res.render("signup", { role: req.query.role || "experts" });

exports.login = (req, res) =>
  res.render("login", { role: req.query.role || "experts" });

exports.dashboard = async (req, res) => {
  const { rows: organisations } = await Organisations.getAll();
  res.render("dashboard", { user: req.user, organisations });
};
