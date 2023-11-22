const { db } = require("utils");

exports.send = (sender, recipient) =>
  db.query(
    "INSERT INTO subscriptions (sender, recipient) VALUES ($1, $2) RETURNING id, sent_at",
    [sender, recipient]
  );

exports.getByOrganisation = (organisation) =>
  db.query(
    "SELECT s.*, o.name FROM subscriptions AS s JOIN organisations AS o ON s.recipient = o.id AND s.sender = $1 OR s.sender = o.id AND s.recipient = $1",
    [organisation]
  );

exports.accept = (id) =>
  db.query(
    "UPDATE subscriptions SET accepted_at = CURRENT_TIMESTAMP WHERE id = $1 RETURNING *",
    [id]
  );

exports.remove = (id) =>
  db.query("DELETE FROM subscriptions WHERE id = $1 RETURNING *", [id]);

exports.updateReceived = (organisation) =>
  db.query(
    "UPDATE subscriptions SET received_at = CURRENT_TIMESTAMP WHERE recipient = $1 AND received_at IS NULL",
    [organisation]
  );

exports.getSubscribers = (organisation) =>
  db.query(
    "SELECT id, sender FROM subscriptions WHERE recipient = $1 AND accepted_at IS NOT NULL",
    [organisation]
  );

exports.find = (id) =>
  db.query(
    "SELECT s.*, o1.name AS sender_name, o2.name AS recipient_name FROM subscriptions AS s LEFT JOIN organisations AS o1 ON s.sender = o1.id LEFT JOIN organisations AS o2 ON s.recipient = o2.id WHERE s.id = $1",
    [id]
  );
