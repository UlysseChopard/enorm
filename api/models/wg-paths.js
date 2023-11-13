const { db } = require("utils");

exports.add = (subscription, wg) =>
  db.query(
    "INSERT INTO wg_paths (subscription, working_group) VALUES ($1, $2) ON CONFLICT DO NOTHING",
    [subscription, wg]
  );

exports.remove = (subscription, wg) =>
  db.query(
    "DELETE FROM wg_paths WHERE subscription = $1 AND working_group = $2",
    [subscription, wg]
  );

exports.getById = (id) =>
  db.query("SELECT * FROM wg_paths WHERE id = $1", [id]);

exports.getByWGAndUser = (userId, wg) =>
  db.query(
    "SELECT wgp.id, s.id AS subscription_id, a.firstname, a.lastname FROM wg_paths AS wgp JOIN subscriptions AS s ON wgp.subscription = s.id JOIN accounts AS a ON s.recipient = a.id WHERE wgp.working_group = $1 AND wgp.subscription IN (SELECT id FROM subscriptions AS s WHERE s.sender = $2)",
    [wg, userId]
  );
