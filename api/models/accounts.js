const format = require("pg-format");
const { db } = require("../utils");

exports.getByEmail = (email) =>
  db.query("SELECT * FROM accounts WHERE email = $1", [email]);

exports.getById = (id) =>
  db.query("SELECT * FROM accounts WHERE id = $1", [id]);

exports.create = ({ email, hash, firstname, lastname, gender }) =>
  db.query(
    "INSERT INTO accounts (email, hash, firstname, lastname, gender) VALUES ($1, $2, $3, $4, $5) RETURNING *",
    [email, hash, firstname, lastname, gender]
  );

exports.update = (id, { email, hash, firstname, lastname, gender }) =>
  db.query(
    "UPDATE accounts SET email = $1, hash = $2, firstname = $3, lastname = $4, gender = $5 WHERE id = $6 RETURNING *",
    [email, hash, firstname, lastname, gender, id]
  );

exports.close = (id) => db.query("DELETE FROM accounts WHERE id = $1", [id]);

exports.searchText = (query, limit = 100) =>
  db.query(
    format(
      "SELECT id, email, firstname, lastname FROM accounts WHERE LOWER(firstname) LIKE '%%%1$s%%' OR LOWER(lastname) LIKE '%%%1$s%%' OR LOWER(email) LIKE '%%%1$s%%' LIMIT %L",
      query,
      limit
    )
  );
