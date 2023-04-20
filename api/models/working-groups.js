const { db } = require("../utils");

exports.getAll = (userId) =>
  db.query(
    "SELECT g.id, g.created_at, g.organisation, g.reference, g.title, g.disbanded_at, a.email FROM working_groups AS g INNER JOIN accounts AS a ON g.admin = a.id WHERE g.admin = $1",
    [userId]
  );

exports.create = (userId, { organisation, title, reference }) =>
  db.query(
    "INSERT INTO working_groups (admin, organisation, title, reference, created_at) VALUES ($1, $2, $3, $4, CURRENT_TIMESTAMP) RETURNING *",
    [userId, organisation, title, reference]
  );

exports.getById = (groupId) =>
  db.query("SELECT * FROM working_groups WHERE id = $1", [groupId]);
