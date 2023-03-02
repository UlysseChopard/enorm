const { db } = require("../utils");

exports.send = (sender, recipient) =>
  db.query(
    "INSERT INTO subscriptions (sender, recipient) VALUES ($1, $2) RETURNING id, sended_at",
    [sender, recipient]
  );

exports.getPendingSended = (recipient) =>
  db.query(
    "SELECT *, s.id FROM subscriptions AS s JOIN accounts AS a ON s.recipient = a.id WHERE s.sender = $1 AND accepted_at IS NULL AND rejected_at IS NULL",
    [recipient]
  );

exports.getPendingReceived = (recipient) =>
  db.query(
    "SELECT *, s.id FROM subscriptions AS s JOIN accounts AS a ON s.sender = a.id WHERE s.recipient = $1 AND accepted_at IS NULL AND rejected_at IS NULL",
    [recipient]
  );

exports.getAcceptedSended = (recipient) =>
  db.query(
    "SELECT *, s.id FROM subscriptions AS s JOIN accounts AS a ON s.recipient = a.id WHERE sender = $1 AND accepted_at IS NOT NULL AND rejected_at IS NULL",
    [recipient]
  );

exports.getAcceptedReceived = (recipient) =>
  db.query(
    "SELECT *, s.id FROM subscriptions AS s JOIN accounts AS a ON s.sender = a.id WHERE recipient = $1 AND accepted_at IS NOT NULL AND rejected_at IS NULL",
    [recipient]
  );

exports.accept = (id) =>
  db.query(
    "UPDATE subscriptions SET accepted_at = CURRENT_TIMESTAMP WHERE id = $1",
    [id]
  );

exports.close = (id) =>
  db.query(
    "UPDATE subscriptions SET rejected_at = CURRENT_TIMESTAMP WHERE id = $1",
    [id]
  );
