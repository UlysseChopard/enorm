const db = require("../db");

exports.create = ({ email, password, firstName = "", lastName = "" }) =>
  db.query(
    "INSERT INTO users (email, password, first_name, last_name) VALUES ($1, $2, $3, $4) RETURNING id, email, first_name, last_name",
    [email, password, firstName, lastName]
  );

exports.getAll = () => db.query("SELECT email FROM users");

exports.getByOrganisation = (organisation) =>
  db.query("SELECT * FROM users WHERE organisation = $1", [organisation]);

exports.getByEmail = (email) =>
  db.query(
    "SELECT id, email, password, first_name, last_name FROM users WHERE email = $1",
    [email]
  );

exports.getById = (id) =>
  db.query("SELECT id, email, first_name, last_name FROM users WHERE id = $1", [
    id,
  ]);

exports.updateRole = (id, { isExpert, isManager }) =>
  db.query("UPDATE users SET is_expert = $1, is_manager = $2 WHERE id = $3", [
    isExpert,
    isManager,
    id,
  ]);

exports.updateOrganisation = (id, organisation) =>
  db.query("UPDATE users SET organisation = $1 WHERE id = $2", [
    organisation,
    id,
  ]);
