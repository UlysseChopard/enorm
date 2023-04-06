const { db } = require("../utils");

exports.create = (userId, email) =>
  db.query("INSERT INTO members (account, email) VALUES ($1, $2) RETURNING *", [
    userId,
    email,
  ]);

exports.remove = (userId, id) =>
  db.query("DELETE FROM members WHERE id = $1 AND account = $2 RETURNING *", [
    id,
    userId,
  ]);

exports.getAll = (userId) =>
  db.query("SELECT * FROM members WHERE account = $1", [userId]);

exports.join = (userId, id) =>
  db.query(
    "UPDATE members SET member = $1, accepted_at = CURRENT_TIMESTAMP WHERE id = $2",
    [userId, id]
  );
