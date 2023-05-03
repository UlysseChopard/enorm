const { db } = require("../utils");

exports.getByUserId = (userId) =>
  db.query(
    "SELECT wg.*, a.firstname, a.lastname, a.id FROM wg_paths AS wgp JOIN working_groups AS wg ON wgp.working_group = wg.id JOIN accounts AS a ON wg.admin = a.id WHERE wgp.subscription IN (SELECT id FROM subscriptions WHERE sender = $1)",
    [userId]
  );

exports.create = async (userId, { organisation, title, reference }) => {
  const result = await db.query(
    "INSERT INTO working_groups (admin, organisation, title, reference, created_at) VALUES ($1, $2, $3, $4, CURRENT_TIMESTAMP) RETURNING *",
    [userId, organisation, title, reference]
  );
  await db.query("INSERT INTO wg_paths (working_group) VALUES ($1)", [
    result.rows[0].id,
  ]);
  return result;
};

// TODO: remove
exports.getById = (groupId) =>
  db.query("SELECT * FROM working_groups WHERE id = $1", [groupId]);
