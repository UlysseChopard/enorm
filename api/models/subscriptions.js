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

exports.getPrevious = (firstUser, secondUser) =>
  db.query(
    "SELECT * FROM subscriptions WHERE sender IN ($1, $2) OR recipient IN ($1, $2)",
    [firstUser, secondUser]
  );

exports.accept = (id) =>
  db.query(
    "UPDATE subscriptions SET accepted_at = CURRENT_TIMESTAMP WHERE id = $1 RETURNING id",
    [id]
  );

exports.close = (id) =>
  db.query(
    "UPDATE subscriptions SET rejected_at = CURRENT_TIMESTAMP WHERE id = $1 RETURNING id",
    [id]
  );

exports.reset = (id) =>
  db.query(
    "UPDATE subscriptions SET sended_at = CURRENT_TIMESTAMP,  accepted_at = NULL, received_at = NULL,  rejected_at = NULL WHERE id = $1 RETURNING id, sended_at",
    [id]
  );
