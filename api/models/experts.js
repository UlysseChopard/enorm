const db = require("../db");

exports.save = ({ manager, email, user, readOnly = true }) =>
  db.query(
    "INSERT INTO experts (manager_id, email, user_id, read_only) VALUES ($1, $2, $3, $4)",
    [manager, email, user, readOnly]
  );

exports.get = (id) =>
  db.query("SELECT email FROM experts WHERE manager_id = $1", [id]);

exports.deleteByEmailAndManager = ({ manager, email }) =>
  db.query("DELETE FROM experts WHERE manager_id = $1 AND email = $2", [
    manager,
    email,
  ]);
