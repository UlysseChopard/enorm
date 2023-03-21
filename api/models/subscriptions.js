const { db } = require("../utils");

exports.send = (sender, recipient) =>
  db.query(
    "INSERT INTO subscriptions (sender, recipient) VALUES ($1, $2) RETURNING id, sended_at",
    [sender, recipient]
  );

exports.getPendingSended = (recipient) =>
  db.query(
    "SELECT *, s.id FROM subscriptions AS s JOIN accounts AS a ON s.recipient = a.id WHERE s.sender = $1 AND accepted_at IS NULL",
    [recipient]
  );

exports.getPendingReceived = (recipient) =>
  db.query(
    "SELECT *, s.id FROM subscriptions AS s JOIN accounts AS a ON s.sender = a.id WHERE s.recipient = $1 AND accepted_at IS NULL",
    [recipient]
  );

exports.getAcceptedSended = (recipient) =>
  db.query(
    "SELECT *, s.id FROM subscriptions AS s JOIN accounts AS a ON s.recipient = a.id WHERE sender = $1 AND accepted_at IS NOT NULL",
    [recipient]
  );

exports.getAcceptedReceived = (recipient) =>
  db.query(
    "SELECT *, s.id FROM subscriptions AS s JOIN accounts AS a ON s.sender = a.id WHERE recipient = $1 AND accepted_at IS NOT NULL",
    [recipient]
  );

exports.getAccepted = (userId) =>
  db.query(
    "SELECT sender, recipient FROM subscriptions WHERE sender = $1 OR recipient = $1 AND accepted_at IS NOT NULL",
    [userId]
  );

exports.accept = (id) =>
  db.query(
    "UPDATE subscriptions SET accepted_at = CURRENT_TIMESTAMP WHERE id = $1 RETURNING id",
    [id]
  );

exports.close = (id) =>
  db.query("DELETE FROM subscriptions WHERE id = $1", [id]);
