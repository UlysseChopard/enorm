const { db } = require("../utils");

exports.create = (userId, name) =>
  db.query("INSERT INTO societies (admin, name) VALUES ($1, $2) RETURNING *", [
    userId,
    name,
  ]);

exports.update = (userId, { name, id }) =>
  db.query(
    "UPDATE societies SET admin = $1, name = $2 WHERE id = $3 RETURNING *",
    [userId, name, id]
  );

exports.getByAdmin = (userId) =>
  db.query("SELECT * FROM societies WHERE admin = $1", [userId]);
