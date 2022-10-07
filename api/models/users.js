const db = require("../db");

exports.createAccount = ({
  email,
  password,
  firstName,
  lastName,
  phoneNumber,
  civility,
}) =>
  db.query(
    "INSERT INTO users (email, password, first_name, last_name, phone_no, civility, organisation, is_expert, is_manager) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING id, email, first_name, last_name, phone_no, civility",
    [
      email,
      password,
      firstName,
      lastName,
      phoneNumber,
      civility,
      false,
      true,
    ]
  );


exports.getByEmail = (email) =>
  db.query(
    "SELECT id, email, password, first_name, last_name, is_expert, is_manager FROM users WHERE email = $1",
    [email]
  );

exports.getById = (id) =>
  db.query(
    "SELECT id, email, first_name, last_name, is_expert, is_manager FROM users WHERE id = $1",
    [id]
  );

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
