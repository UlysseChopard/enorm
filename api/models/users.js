const db = require("../db");

exports.createAccount = ({
  email,
  password,
  firstName,
  lastName,
  isExpert,
  isManager,
  phoneNumber,
  civility,
  organisation,
}) =>
  db.query(
    "INSERT INTO users (email, password, first_name, last_name, is_expert, is_manager, phone_no, civility, organisation) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING id, email, first_name, last_name, phone_no, civility, is_expert, is_manager, organisation",
    [
      email,
      password,
      firstName,
      lastName,
      isExpert,
      isManager,
      phoneNumber,
      civility,
      organisation,
    ]
  );

exports.getAll = () => db.query("SELECT email FROM users");

exports.getByOrganisation = (organisation) =>
  db.query("SELECT * FROM users WHERE organisation = $1", [organisation]);

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

exports.activeAccount = (
  id,
  { firstName, lastName, civility, phoneNumber, password }
) =>
  db.query(
    "UPDATE users SET first_name = $1, last_name = $2, civility = $3, phone_no = $4, password = $5 WHERE id = $6",
    [firstName, lastName, civility, phoneNumber, password, id]
  );

exports.declareExpert = ({ email, organisation }) =>
  db.query("INSERT INTO users (email, organisation) VALUES ($1, $2)", [
    email,
    organisation,
  ]);
