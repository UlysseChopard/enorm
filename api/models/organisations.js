const db = require("../db");

exports.getByManager = (manager) =>
  db.query(
    "SELECT o1.* FROM organisations o1 LEFT JOIN organisations o2 ON o1.parent = o2.id  WHERE o1.manager = $1",
    [manager]
  );

exports.createParent = (manager, { name, address }) =>
  db.query(
    "INSERT INTO organisations (name, address, manager) VALUES ($1, $2, $3) RETURNING id",
    [name, address, manager]
  );

exports.createChild = (manager, { name, address, parent }) =>
  db.query(
    "INSERT INTO organisations (name, address, parent, manager) VALUES ($1, $2, $3, $4)",
    [name, address, parent, manager]
  );
