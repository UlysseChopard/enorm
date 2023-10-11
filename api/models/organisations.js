const { db } = require("utils");

exports.create = (userId, name = "") =>
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

exports.remove = (id) =>
  db.query("DELETE FROM organisations WHERE id = $1 RETURNING *", [id]);

exports.get = () =>
  db.query(
    "SELECT o.id, o.name, a.id AS account, a.firstname, a.lastname, a.email, t.id AS token, t.expires_at FROM organisations AS o JOIN accounts AS a ON o.admin = a.id LEFT JOIN tokens AS t ON a.id = t.account"
  );
