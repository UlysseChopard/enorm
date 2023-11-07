const { db } = require("utils");

exports.getByOrganisation = (organisation) =>
  db.query(
    "SELECT wg.*, o.name AS organisation_name FROM working_groups AS wg LEFT JOIN organisations AS o ON wg.organisation = o.id WHERE wg.id IN (SELECT working_group FROM wg_paths WHERE subscription IN (SELECT id FROM subscriptions WHERE sender = $1)) OR organisation = $1",
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
  db.query("SELECT * FROM working_groups WHERE id = $1", [id]);

exports.remove = (id) =>
  db.query("DELETE FROM working_groups WHERE id = $1", [id]);
