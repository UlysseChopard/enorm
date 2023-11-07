const { db } = require("utils");

exports.get = (account, organisation) =>
  db.query(
    "SELECT wg.*, o.name AS organisation_name FROM working_groups AS wg LEFT JOIN organisations AS o ON wg.organisation = o.id WHERE wg.id IN (SELECT working_group FROM wg_paths WHERE subscription IN (SELECT id FROM subscriptions WHERE sender = $1)) OR organisation = $2",
    [account, organisation]
  );

exports.create = (organisation, { title, reference }) =>
  db.query(
    "INSERT INTO working_groups (organisation, title, reference, created_at) VALUES ($1, $2, $3, CURRENT_TIMESTAMP) RETURNING *",
    [organisation, title, reference]
  );

exports.find = (id, account) =>
  db.query(
    "SELECT wg.*, o.name AS organisation_name, wgp.id AS wg_path FROM working_groups AS wg LEFT JOIN organisations AS o ON wg.organisation = o.id LEFT JOIN wg_paths AS wgp ON wgp.working_group = wg.id WHERE wg.id = $1 AND (wgp.subscription IN (SELECT id FROM subscriptions WHERE sender = $2) OR wgp.subscription IS NULL)",
    [id, account]
  );

exports.getIdsByOrganisation = (organisation) =>
  db.query(
    "SELECT id FROM working_groups WHERE organisation = $1 UNION SELECT working_group FROM wg_paths WHERE subscription IN (SELECT id FROM subscriptions WHERE sender = $1)",
    [organisation]
  );

exports.remove = (id) =>
  db.query("DELETE FROM working_groups WHERE id = $1", [id]);
