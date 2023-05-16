const { db } = require("../utils");

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

exports.find = (userId, wg) =>
  db.query(
    "SELECT wg.*, a.id AS user_id, a.firstname, a.lastname, p.id AS wg_path FROM wg_paths AS p JOIN working_groups AS wg ON p.working_group = wg.id JOIN subscriptions AS s ON p.subscription = s.id JOIN accounts AS a ON s.recipient = a.id WHERE p.working_group = $2 AND p.subscription IN (SELECT id FROM subscriptions WHERE sender = $1)",
    [userId, wg]
  );
