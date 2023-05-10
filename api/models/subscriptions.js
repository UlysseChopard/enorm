const { db } = require("../utils");

exports.send = (sender, recipient) =>
  db.query(
    "INSERT INTO subscriptions (sender, recipient) VALUES ($1, $2) RETURNING id, sended_at",
    [sender, recipient]
  );

exports.getByUser = (userId) =>
  db.query(
    "SELECT *, s.id FROM subscriptions AS s JOIN accounts AS a ON s.recipient = a.id AND s.sender = $1 OR s.sender = a.id AND s.recipient = $2",
    [userId, userId]
  );

exports.getAccepted = (userId) =>
  db.query(
    "SELECT recipient FROM subscriptions WHERE sender = $1 AND accepted_at IS NOT NULL",
    [userId]
  );

exports.accept = (id) =>
  db.query(
    "UPDATE subscriptions SET accepted_at = CURRENT_TIMESTAMP WHERE id = $1 RETURNING *",
    [id]
  );

exports.close = (id) =>
  db.query("DELETE FROM subscriptions WHERE id = $1", [id]);

exports.updateReceived = (userId) =>
  db.query(
    "UPDATE subscriptions SET received_at = CURRENT_TIMESTAMP WHERE recipient = $1 AND received_at IS NULL",
    [userId]
  );

exports.getSubscribers = (userId) =>
  db.query("SELECT id, sender FROM subscriptions WHERE recipient = $1", [
    userId,
  ]);
