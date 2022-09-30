const Users = require("../models/users");
const Organisations = require("../models/organisations");
const log = require("../utils/logs");

exports.home = (_req, res) => res.render("index");

exports.signup = (req, res) =>
  res.render("signup", { role: req.query.role || "experts" });

exports.login = (req, res) =>
  res.render("login", { role: req.query.role || "experts" });

exports.dashboard = async (req, res) => {
  const role = req.query.role;
  log.info({ user: req.user });
  const { rows: users } = await Users.getAll(role);
  const { rows: organisations } = await Organisations.getAll();
  res.render("dashboard", {
    users,
    organisations,
    role,
  });
};
