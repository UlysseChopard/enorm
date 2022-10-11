const db = require("../db");

const INFOS =
  "users.id, users.email, users.password, users.first_name, users.last_name, users.civility, users.is_manager, users.is_expert, users.manager, users.organisation";

exports.getByOrganisation = (organisation) =>
  db.query(`SELECT ${INFOS} FROM users WHERE organisation = $1`, [
    organisation,
  ]);

exports.getByManager = (manager) =>
  db.query(
    `SELECT ${INFOS} FROM users LEFT JOIN organisations ON organisations.id = users.organisation WHERE users.manager = $1`,
    [manager]
  );

exports.getByEmail = (email) =>
  db.query(`SELECT ${INFOS} FROM users WHERE email = $1`, [email]);

exports.getById = (id) =>
  db.query(`SELECT ${INFOS} FROM users WHERE id = $1`, [id]);

exports.createExpertAccount = ({
  email,
  manager,
  organisation,
  password = "tmp",
  isExpert = true,
}) =>
  db.query(
    "INSERT INTO users (email, password, manager, organisation, is_expert) VALUES ($1, $2, $3, $4, $5) RETURNING id",
    [email, password, manager, organisation, isExpert]
  );

exports.createManagerAccount = ({
  email,
  password,
  firstName,
  lastName,
  phoneNumber,
  civility,
  isManager = true,
}) =>
  db.query(
    `INSERT INTO users (email, password, first_name, last_name, phone_no, civility, is_manager) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING ${INFOS}`,
    [email, password, firstName, lastName, phoneNumber, civility, isManager]
  );

exports.activateExpertAccount = (
  id,
  { firstName, lastName, civility, phoneNumber, password }
) =>
  db.query(
    `UPDATE users SET first_name = $1, last_name = $2, civility = $3, phone_no = $4, password = $5 WHERE id = $6 RETURNING ${INFOS}`,
    [firstName, lastName, civility, phoneNumber, password, id]
  );

exports.updateManager = (id, { manager }) =>
  db.query("UPDATE users SET manager = $1 WHERE id = $2", [manager, id]);

exports.updateOrganisation = (id, { organisation }) =>
  db.query("UPDATE users SET organisation = $1 WHERE id = $2", [
    organisation,
    id,
  ]);

exports.updateDescription = (id, { description }) =>
  db.query("UPDATE users SET description = $1 WHERE id = $2", [
    description,
    id,
  ]);
