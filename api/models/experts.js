const db = require("../db");

exports.save = ({ manager, email, user }) =>
  db.query(
    "INSERT INTO experts (manager_id, email, user_id) VALUES ($1, $2, $3)",
    [manager, email, user]
  );

exports.get = (id) =>
  db.query("SELECT email FROM experts WHERE manager_id = $1", [id]);

exports.deleteByEmailAndManager = ({ manager, email }) =>
  db.query("DELETE FROM experts WHERE manager_id = $1 AND email = $2", [
    manager,
    email,
  ]);
