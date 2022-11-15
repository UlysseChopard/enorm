const db = require("../db");

exports.save = ({ sender, email, user }) =>
  db.query(
    "INSERT INTO roles (sender_id, email, user_id) VALUES ($1, $2, $3)",
    [sender, email, user]
  );

exports.get = (id) =>
  db.query("SELECT email FROM roles WHERE sender_id = $1", [id]);

exports.deleteByEmailAndSender = ({ sender, email }) =>
  db.query("DELETE FROM roles WHERE sender_id = $1 AND email = $2", [
    sender,
    email,
  ]);
