const { db } = require("../utils");

exports.create = (userId, name) =>
  db.query(
    "INSERT INTO organisations (admin, name) VALUES ($1, $2) RETURNING *",
    [userId, name]
  );

exports.update = (id, { name, admin }) =>
  db.query(
    "UPDATE organisations SET admin = $1, name = $2 WHERE id = $3 RETURNING *",
    [admin, name, id]
  );

exports.getByAdmin = (userId) =>
  db.query("SELECT * FROM organisations WHERE admin = $1", [userId]);

exports.closeByAdmin = (userId, id) =>
  db.query("DELETE FROM organisations WHERE id = $1 AND admin = $2", [
    id,
    userId,
  ]);
