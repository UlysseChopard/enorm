const db = require("../db");

const INFOS =
  "id, email, password, first_name, last_name, civility, is_manager, is_expert, manager, organisation, uuid";

exports.getByOrganisation = (organisation) =>
  db.query(`SELECT ${INFOS} FROM users WHERE organisation = $1`, [
    organisation,
  ]);

exports.getByManager = (manager) =>
  db.query(
    `SELECT u.id, u.email, u.first_name, u.last_name, u.civility, o.name AS organisation_name FROM users u LEFT JOIN organisations o ON u.organisation = o.id WHERE u.manager = $1`,
    [manager]
  );

exports.getByEmail = (email) =>
  db.query(`SELECT ${INFOS} FROM users WHERE email = $1`, [email]);

exports.getById = (id) =>
  db.query(`SELECT ${INFOS} FROM users WHERE id = $1`, [id]);

exports.getByUUID = (uuid) =>
  db.query(`SELECT ${INFOS} FROM users WHERE uuid = $1`, [uuid]);

exports.createExpertAccount = ({
  email,
  manager,
  organisation,
  uuid,
  isExpert = true,
}) =>
  db.query(
    "INSERT INTO users (email, password, manager, organisation, is_expert, uuid) VALUES ($1, $2, $3, $4, $5, $6) RETURNING id",
    [email, "not created", manager, organisation, isExpert, uuid]
  );

exports.createManagerAccount = ({
  email,
  password,
  firstName,
  lastName,
  phoneNumber,
  civility,
  uuid,
  isManager = true,
}) =>
  db.query(
    `INSERT INTO users (email, password, first_name, last_name, phone_no, civility, is_manager, uuid) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING ${INFOS}`,
    [
      email,
      password,
      firstName,
      lastName,
      phoneNumber,
      civility,
      isManager,
      uuid,
    ]
  );

exports.activateExpertAccount = (
  uuid,
  { firstName, lastName, civility, phoneNumber, password }
) =>
  db.query(
    `UPDATE users SET first_name = $1, last_name = $2, civility = $3, phone_no = $4, password = $5 WHERE uuid = $6 RETURNING ${INFOS}`,
    [firstName, lastName, civility, phoneNumber, password, uuid]
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
