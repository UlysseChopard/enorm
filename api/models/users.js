const db = require("../db");
const format = require("pg-format");

exports.create = ({ email, password, organisation, role = "experts" }) =>
  db.query(
    format(
      "INSERT INTO %I (email, password, organisation) VALUES ($1, $2, $3)",
      role
    ),
    [email, password, organisation]
  );

exports.getAll = (role = "experts") =>
  db.query(format("SELECT email FROM %I", role));

exports.getById = (id, role = "experts") =>
  db.query(
    format(
      "SELECT email, password, organisation FROM %I WHERE email = $1",
      role
    ),
    [id]
  );
