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

exports.accept = async (id) => {
  const result = await db.query(
    "UPDATE subscriptions SET accepted_at = CURRENT_TIMESTAMP WHERE id = $1 RETURNING *",
    [id]
  );
  await db.query(
    "INSERT INTO wg_paths (subscription, working_group) VALUES SELECT $1, id FROM working_groups WHERE admin = $2 UNION SELECT $1, working_group FROM wg_paths WHERE subscription IN (SELECT id FROM subscriptions WHERE sender = $2)",
    [result.rows[0].id, result.rows[0].recipient]
  );
  return result;
};

exports.close = (id) =>
  db.query("DELETE FROM subscriptions WHERE id = $1", [id]);

exports.updateReceived = (userId) =>
  db.query(
    "UPDATE subscriptions SET received_at = CURRENT_TIMESTAMP WHERE recipient = $1 AND received_at IS NULL",
    [userId]
  );
