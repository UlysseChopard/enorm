const { db } = require("utils");

exports.add = (subscription, wg) =>
  db.query(
    "INSERT INTO wg_paths (subscription, working_group) VALUES ($1, $2) ON CONFLICT DO NOTHING",
    [subscription, wg],
  );

exports.remove = (subscription, wg) =>
  db.query(
    "DELETE FROM wg_paths WHERE subscription = $1 AND working_group = $2",
    [subscription, wg],
  );

exports.getById = (id) =>
  db.query("SELECT * FROM wg_paths WHERE id = $1", [id]);

exports.find = (organisation, wg) =>
  db.query(
    "SELECT wgp.id, wgp.subscription, NULL AS sender, s.recipient, s.sent_at, s.received_at, s.accepted_at, o.name AS organisation_name FROM wg_paths AS wgp JOIN subscriptions AS s ON wgp.subscription = s.id JOIN organisations AS o ON s.recipient = o.id WHERE wgp.working_group = $1 AND s.sender = $2 UNION SELECT wgp.id, wgp.subscription, s.sender, NULL, s.sent_at, s.received_at, s.accepted_at, o.name AS organisation_name FROM wg_paths AS wgp JOIN subscriptions AS s ON wgp.subscription = s.id JOIN organisations AS o ON s.sender = o.id WHERE wgp.working_group = $1 AND s.recipient = $2",
    [wg, organisation],
  );

exports.getWGOrganisation = (id) =>
  db.query(
    "SELECT wg.organisation FROM wg_paths AS wgp LEFT JOIN working_groups AS wg ON wgp.working_group = wg.id WHERE wgp.id = $1",
    [id],
  );
