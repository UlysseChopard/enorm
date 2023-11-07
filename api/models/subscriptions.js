const { db } = require("utils");

exports.send = (sender, recipient) =>
  db.query(
    "INSERT INTO subscriptions (sender, recipient) VALUES ($1, $2) RETURNING id, sent_at",
    [sender, recipient]
  );

exports.getByOrganisation = (organisation) =>
  db.query(
    "SELECT s.*, o.name AS organisation_name FROM subscriptions AS s JOIN organisations AS o ON s.recipient = o.id AND s.sender = $1 OR s.sender = o.id AND s.recipient = $1",
    [organisation]
  );

exports.accept = (id) =>
  db.query(
    "UPDATE subscriptions SET accepted_at = CURRENT_TIMESTAMP WHERE id = $1 RETURNING *",
    [id]
  );

exports.remove = (id) =>
  db.query("DELETE FROM subscriptions WHERE id = $1 RETURNING *", [id]);

exports.updateReceived = (account) =>
  db.query(
    "UPDATE subscriptions SET received_at = CURRENT_TIMESTAMP WHERE recipient = $1 AND received_at IS NULL",
    [account]
  );

exports.getSubscribers = (account) =>
  db.query(
    "SELECT id, sender FROM subscriptions WHERE recipient = $1 AND accepted_at IS NOT NULL",
    [account]
  );
