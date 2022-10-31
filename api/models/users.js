const db = require("../db");

const INFOS =
  "id, email, password, first_name, last_name, civility, manager, organisation, uuid, is_activated";

exports.getByOrganisation = (organisation) =>
  db.query(`SELECT ${INFOS} FROM users WHERE organisation = $1`, [
    organisation,
  ]);

exports.getByManager = (manager) =>
  db.query(
    "SELECT u.id, u.email, u.first_name, u.last_name, u.civility, o.name AS organisation_name FROM users u LEFT JOIN organisations o ON u.organisation = o.id WHERE u.manager = $1",
    [manager]
  );

exports.getByEmail = (email) =>
  db.query(`SELECT ${INFOS} FROM users WHERE email = $1`, [email]);

exports.getById = (id) =>
  db.query(`SELECT ${INFOS} FROM users WHERE id = $1`, [id]);

exports.getByUUID = (uuid) =>
  db.query(`SELECT ${INFOS} FROM users WHERE uuid = $1`, [uuid]);

exports.createAccount = ({
  email,
  password,
  firstname,
  lastname,
  phonenumber,
  civility,
  uuid,
}) =>
  db.query(
    `INSERT INTO users (email, password, first_name, last_name, phone_no, civility, uuid) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING ${INFOS}`,
    [email, password, firstname, lastname, phonenumber, civility, uuid]
  );

exports.activateAccount = (uuid) =>
  db.query(
    "UPDATE users SET is_activated = TRUE WHERE uuid = $1 RETURNING id",
    [uuid]
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

exports.updateAccount = (id, { email, firstname, lastname }) =>
  db.query(
    "UPDATE users SET email = $1, first_name = $2, last_name = $3 WHERE id = $4",
    [email, firstname, lastname, id]
  );

exports.deleteAccount = (id) =>
  db.query("DELETE FROM users WHERE id = $1", [id]);
