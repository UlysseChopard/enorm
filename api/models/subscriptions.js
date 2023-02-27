const { db } = require("../utils");

exports.send = (sender, recipient) =>
  db.query(
    "INSERT INTO subscriptions (sender, recipient) VALUES ($1, $2) RETURNING id, sended_at",
    [sender, recipient]
  );

exports.getSended = (sender) =>
  db.query(
    "SELECT * FROM subscriptions AS s JOIN accounts AS a ON s.recipient = a.id WHERE sender = $1",
    [sender]
  );

exports.getReceived = (recipient) =>
  db.query(
    "SELECT * FROM subscriptions AS s JOIN accounts AS a ON s.sender = a.id WHERE recipient = $1",
    [recipient]
  );

exports.accept = (id) =>
  db.query(
    "UPDATE subscriptions SET accepted_at = CURRENT_TIMESTAMP WHERE id::text = $1",
    [id]
  );

exports.close = (id) =>
  db.query(
    "UPDATE subscriptions SET rejected_at = CURRENT_TIMESTAMP WHERE id::text = $1",
    [id]
  );
