const Users = require("../models/users");

exports.home = (_req, res) => res.render("index");

exports.signup = (req, res) => res.render("signup", { role: req.query.role });

exports.login = (req, res) => res.render("login", { role: req.query.role });

exports.dashboard = async (req, res) => {
  const { rows } = await Users.getAll();
  res.render("dashboard", {
    users: rows,
  });
};
