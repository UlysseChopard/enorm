const { db } = require("utils");

exports.get = (id) => db.query("SELECT id FROM tokens WHERE id = $1", [id]);

exports.getByAccount = (account) =>
  db.query("SELECT id FROM tokens WHERE account = $1", [account]);

exports.create = ({ id, account, expiresAt }) =>
  db.query(
    "INSERT INTO tokens (id, account, expires_at) VALUES ($1, $2, $3) RETURNING *",
    [id, account, expiresAt]
  );

exports.remove = (id) =>
  db.query("DELETE FROM tokens WHERE id = $1 RETURNING *", [id]);

exports.removeExpired = () =>
  db.query(
    "DELETE FROM tokens WHERE expires_at < CURRENT_TIMESTAMP RETURNING *"
  );
