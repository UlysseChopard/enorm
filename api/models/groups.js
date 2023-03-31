const { db } = require("../utils");

exports.getAll = (userId) =>
  db.query(
    "SELECT g.created_at, g.organisation, g.reference, g.title, g.disbanded_at, g.open, g.visible, a.email FROM groups AS g INNER JOIN accounts AS a ON g.creator = a.id WHERE g.creator = $1",
    [userId]
  );

exports.create = (userId, { organisation, title, reference, sponsor }) =>
  db.query(
    "INSERT INTO groups (creator, organisation, title, reference, sponsor, created_at) VALUES ($1, $2, $3, $4, $5, CURRENT_TIMESTAMP) RETURNING *",
    [userId, organisation, title, reference, sponsor]
  );

exports.setRegistrationsOpenness = (groupId, isOpen) =>
  db.query("UPDATE groups SET open = $1 WHERE id = $2 RETURNING *", [
    isOpen,
    groupId,
  ]);

exports.setVisibility = (groupId, isVisible) =>
  db.query("UPDATE groups SET visible = $1 WHERE id = $2 RETURNING *", [
    isVisible,
    groupId,
  ]);
