const db = require("../db");

exports.create = ({ email, password, roles, firstName, lastName }) =>
  db.query(
    `INSERT INTO users (email, password, first_name, last_name, roles) VALUES ($1, $2, $3, $4, \'{${roles.join(
      ","
    )}}\') RETURNING id, email, first_name, last_name, roles`,
    [email, password, firstName, lastName]
  );

exports.getAll = () => db.query("SELECT email FROM users");

exports.getByOrganisation = (organisation) =>
  db.query("SELECT * FROM users WHERE organisation = $1", [organisation]);

exports.getByEmail = (email) =>
  db.query(
    "SELECT id, password, first_name, last_name, roles FROM users WHERE email = $1",
    [email]
  );

exports.getById = (id) =>
  db.query(
    "SELECT id, email, first_name, last_name, roles FROM users WHERE id = $1",
    [id]
  );
