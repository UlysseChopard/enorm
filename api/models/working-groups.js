const { db } = require("../utils");

exports.getByUserId = (userId) =>
  db.query(
    "SELECT wg.*, a.firstname, a.lastname, a.id FROM working_groups AS wg JOIN links AS l ON wg.id = l.working_group JOIN accounts AS a ON l.recipient = a.id WHERE wg.admin = $1 OR l.sender = $1",
    [userId]
  );

exports.create = (userId, { organisation, title, reference }) =>
  db.query(
    "INSERT INTO working_groups (admin, organisation, title, reference, created_at) VALUES ($1, $2, $3, $4, CURRENT_TIMESTAMP) RETURNING *",
    [userId, organisation, title, reference]
  );

// TODO: remove
exports.getById = (groupId) =>
  db.query("SELECT * FROM working_groups WHERE id = $1", [groupId]);
