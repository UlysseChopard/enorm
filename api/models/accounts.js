const { db } = require("utils");

exports.getByEmail = (email) =>
  db.query(
    "SELECT id, email, firstname, lastname, gender, superuser FROM accounts WHERE email = $1",
    [email]
  );

exports.get = (id) =>
  db.query(
    "SELECT a.id, a.email, a.firstname, a.lastname, a.gender, a.superuser FROM accounts AS a WHERE a.id = $1",
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
    "INSERT INTO accounts (email, hash, firstname, lastname, gender, superuser) VALUES ($1, $2, $3, $4, $5, $6) ON CONFLICT DO NOTHING RETURNING id, email, firstname, lastname, gender, superuser",
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

exports.removeOrphans = () =>
  db.query(
    "DELETE FROM accounts WHERE NOT superuser AND id NOT IN (SELECT account FROM organisations_members)"
  );
