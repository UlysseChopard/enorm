const { db } = require("../utils");

exports.getByUser = (userId) =>
  db.query(
    "SELECT wg.*  FROM wg_paths AS p JOIN working_groups AS wg ON p.working_group = wg.id WHERE p.subscription IN (SELECT id FROM subscriptions WHERE sender = $1) UNION SELECT * FROM working_groups WHERE admin = $1",
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

exports.find = (userId, wg) =>
  db.query(
    "SELECT wg.*, p.id FROM wg_paths AS p JOIN working_groups AS wg ON p.working_group = wg.id WHERE p.working_group = $2 AND p.subscription IN (SELECT id FROM subscriptions WHERE sender = $1)",
    [userId, wg]
  );
