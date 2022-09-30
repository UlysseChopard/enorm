const db = require("../db");
const format = require("pg-format");

exports.create = ({ email, password, role = "experts" }) =>
  db.query(format("INSERT INTO %I (email, password) VALUES ($1, $2)", role), [
    email,
    password,
  ]);

exports.getAll = (role = "experts") =>
  db.query(format("SELECT email FROM %I", role));

exports.getById = (id, role = "experts") =>
  db.query(format("SELECT email, password FROM %I WHERE email = $1", role), [
    id,
  ]);
