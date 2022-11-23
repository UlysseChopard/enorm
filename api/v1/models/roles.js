const db = require("../../db");

exports.save = ({ sender, email, user }) =>
  db.query(
    "INSERT INTO roles (sender_id, email, user_id) VALUES ($1, $2, $3)",
    [sender, email, user]
  );

exports.setRights = ({ canProposeWG, canJoinWG, email }) =>
  db.query(
    "UPDATE roles SET can_propose_wg = $1, can_join_wg = $2 WHERE email = $3",
    [canProposeWG, canJoinWG, email]
  );

exports.get = (id) =>
  db.query(
    "SELECT email, can_join_wg, can_propose_wg FROM roles WHERE sender_id = $1",
    [id]
  );

exports.deleteByEmailAndSender = ({ sender, email }) =>
  db.query("DELETE FROM roles WHERE sender_id = $1 AND email = $2", [
    sender,
    email,
  ]);
