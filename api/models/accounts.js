const format = require("pg-format");
const { db } = require("utils");

exports.getByEmail = (email) =>
  db.query(
    "SELECT id, email, firstname, lastname, gender, superuser FROM accounts WHERE email = $1",
    [email]
  );

exports.get = (id) =>
  db.query(
    "SELECT id, email, firstname, lastname, gender, superuser FROM accounts WHERE id = $1",
    [id]
  );

exports.getSuperusers = () =>
  db.query(
    "SELECT id, email, firstname, lastname, gender FROM accounts WHERE superuser = TRUE"
  );

exports.create = ({
  email,
  hash,
  firstname,
  lastname,
  gender,
  superuser = false,
}) =>
  db.query(
    "INSERT INTO accounts (email, hash, firstname, lastname, gender, superuser) VALUES ($1, $2, $3, $4, $5, $6) RETURNING id, email, firstname, lastname, gender, superuser",
    [email, hash, firstname, lastname, gender, superuser]
  );

exports.update = (id, { email, hash, firstname, lastname, gender }) =>
  db.query(
    "UPDATE accounts SET email = $1, hash = $2, firstname = $3, lastname = $4, gender = $5 WHERE id = $6 RETURNING id, email, firstname, lastname, gender, superuser",
    [email, hash, firstname, lastname, gender, id]
  );

exports.remove = (id) =>
  db.query(
    "DELETE FROM accounts WHERE id = $1 RETURNING id, email, firstname, lastname, superuser",
    [id]
  );

exports.removeMany = (ids) =>
  db.query(
    "DELETE FROM accounts WHERE id IN ($1) RETURNING id, email, firstname, lastname, gender, superuser",
    [ids.join(",")]
  );

exports.searchText = (query, limit = 100) =>
  db.query(
    format(
      "SELECT id, email, firstname, lastname FROM accounts WHERE LOWER(firstname) LIKE '%%%1$s%%' OR LOWER(lastname) LIKE '%%%1$s%%' OR LOWER(email) LIKE '%%%1$s%%' LIMIT %L",
      query,
      limit
    )
  );
