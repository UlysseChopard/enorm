const { db } = require("utils");

exports.getByUser = (userId) =>
  db.query(
    "SELECT wg.* FROM working_groups AS wg WHERE wg.id IN (SELECT working_group FROM wg_paths WHERE subscription IN (SELECT id FROM subscriptions WHERE sender = $1)) OR admin = $1",
    [userId]
  );

exports.create = (userId, { organisation, title, reference }) =>
  db.query(
    "INSERT INTO working_groups (admin, organisation, title, reference, created_at) VALUES ($1, $2, $3, $4, CURRENT_TIMESTAMP) RETURNING *",
    [userId, organisation, title, reference]
  );

exports.getProvidedByRecipient = (recipient) =>
  db.query(
    "SELECT id FROM working_groups WHERE admin = $1 UNION SELECT working_group FROM wg_paths WHERE subscription IN (SELECT id FROM subscriptions WHERE sender = $1)",
    [recipient]
  );

exports.getById = (id) =>
  db.query("SELECT * FROM working_groups WHERE id = $1", [id]);

exports.deleteByIdAsAdmin = (userId, id) =>
  db.query("DELETE FROM working_groups WHERE id = $1 AND admin = $2", [
    id,
    userId,
  ]);
