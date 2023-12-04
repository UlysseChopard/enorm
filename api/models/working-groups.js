const { db } = require("utils");

exports.getByOrganisation = (organisation) =>
  db.query(
    "SELECT wg.*, o.name AS organisation_name, wgp.id AS wg_path FROM working_groups AS wg LEFT JOIN organisations AS o ON wg.organisation = o.id LEFT JOIN wg_paths AS wgp ON wg.id = wgp.working_group WHERE wgp.subscription IN (SELECT s.id FROM subscriptions AS s WHERE s.sender = $1) UNION SELECT wg2.*, o2.name AS organisation_name, NULL FROM working_groups AS wg2 LEFT JOIN organisations AS o2 ON wg2.organisation = o2.id WHERE wg2.organisation = $1",
    [organisation]
  );

exports.create = (organisation, { title, reference }) =>
  db.query(
    "INSERT INTO working_groups (organisation, title, reference, created_at) VALUES ($1, $2, $3, CURRENT_TIMESTAMP) RETURNING *",
    [organisation, title, reference]
  );

exports.getIdsByOrganisation = (organisation) =>
  db.query(
    "SELECT id FROM working_groups WHERE organisation = $1 UNION SELECT working_group FROM wg_paths WHERE subscription IN (SELECT id FROM subscriptions WHERE sender = $1)",
    [organisation]
  );

exports.find = (id) =>
  db.query(
    "SELECT wg.id, wg.reference, wg.title, wg.created_at, wg.organisation, o.name AS organisation_name FROM working_groups AS wg JOIN organisations AS o ON wg.organisation = o.id WHERE wg.id = $1",
    [id]
  );

exports.remove = (id) =>
  db.query("DELETE FROM working_groups WHERE id = $1", [id]);
