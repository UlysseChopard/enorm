const { db } = require("utils");

exports.create = ({ id, account, expiresAt }) =>
  db.query(
    "INSERT INTO tokens (id, account, expires_at, created_at) VALUES ($1, $2, $3, CURRENT_TIMESTAMP)",
    [id, account, expiresAt]
  );

exports.remove = (id) => db.query("DELETE FROM tokens WHERE id = $1", [id]);

exports.removeExpired = () =>
  db.query("DELETE FROM tokens WHERE expires_at < CURRENT_TIMESTAMP");
