const { db } = require("../utils");

exports.create = ({ name, creator }) =>
  db.query(
    "INSERT INTO companies (name, creator) VALUES ($1, $2) RETURNING id",
    [name, creator]
  );

exports.getByCreator = (creator) =>
  db.query("SELECT id, name FROM companies WHERE creator = $1", [creator]);
