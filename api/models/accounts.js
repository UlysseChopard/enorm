const { db } = require("../utils");

const SAFE_DATA =
  "firstname, lastname, gender, email, cellphone, phone, hash, company";

exports.getByEmail = (email) =>
  db.query("SELECT * FROM accounts WHERE email = $1", [email]);

exports.getById = (id) =>
  db.query(`SELECT ${SAFE_DATA} FROM accounts WHERE id = $1`, [id]);

exports.create = ({ email, hash, firstname, lastname, gender, company }) =>
  db.query(
    `INSERT INTO accounts (email, hash, firstname, lastname, gender, company) VALUES ($1, $2, $3, $4, $5, $6) RETURNING ${SAFE_DATA}`,
    [email, hash, firstname, lastname, gender, company]
  );

exports.update = (
  id,
  { email, hash, firstname, lastname, gender, cellphone, phone, company }
) =>
  db.query(
    `UPDATE accounts SET email = $1, hash = $2, firstname = $3, lastname = $4, gender = $5, cellphone = $6, phone = $7, company = $8  WHERE id = $9 RETURNING ${SAFE_DATA}`,
    [email, hash, firstname, lastname, gender, cellphone, phone, company, id]
  );

exports.close = (id) => db.query("DELETE FROM accounts WHERE id = $1", [id]);
