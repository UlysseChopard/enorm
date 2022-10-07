const db = require("../db");

exports.getAll = (manager) =>
  db.query("SELECT * FROM organisations WHERE manager = $1", [manager]);

exports.createParent = (manager, { name, address }) =>
  db.query(
    "INSERT INTO organisations (name, address, manager) VALUES ($1, $2, $3)",
    [name, address, manager]
  );

exports.createChild = (manager, { name, address, parent }) =>
  db.query(
    "INSERT INTO organisations (name, address, parent, manager) VALUES ($1, $2, $3, $4)",
    [name, address, parent, manager]
  );
