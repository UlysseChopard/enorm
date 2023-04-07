const { db } = require("../utils");

exports.create = ({ name, creator }) =>
  db.query(
    "INSERT INTO organisations (name, creator) VALUES ($1, $2) RETURNING id",
    [name, creator]
  );

exports.getByCreator = (creator) =>
  db.query("SELECT id, name FROM organisations WHERE creator = $1", [creator]);
