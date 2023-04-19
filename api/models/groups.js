const { db } = require("../utils");

exports.getAll = (userId) =>
  db.query(
    "SELECT g.id, g.created_at, g.organisation, g.reference, g.title, g.disbanded_at, a.email FROM groups AS g INNER JOIN accounts AS a ON g.creator = a.id WHERE g.creator = $1",
    [userId]
  );

exports.getVisibles = (userId) =>
  db.query(
    "SELECT g.id, g.created_at, g.organisation, g.reference, g.title, g.disbanded_at, a.email FROM groups AS g INNER JOIN accounts AS a ON g.creator = a.id WHERE  AND g.creator = $1",
    [userId]
  );

exports.create = (userId, { organisation, title, reference, sponsor }) =>
  db.query(
    "INSERT INTO groups (creator, organisation, title, reference, sponsor, created_at) VALUES ($1, $2, $3, $4, $5, CURRENT_TIMESTAMP) RETURNING *",
    [userId, organisation, title, reference, sponsor]
  );

exports.getById = (groupId) =>
  db.query("SELECT * FROM groups WHERE id = $1", [groupId]);
