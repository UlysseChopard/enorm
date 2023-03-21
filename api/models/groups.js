const { db } = require("../utils");

exports.getAll = () =>
  db.query(
    "SELECT g.created_at, g.organisation, g.reference, g.title, a.email FROM groups AS g INNER JOIN accounts AS a ON g.creator = a.id"
  );

exports.create = (userId, { organisation, title, reference, sponsor }) =>
  db.query(
    "INSERT INTO groups (creator, organisation, title, reference, sponsor, created_at) VALUES ($1, $2, $3, $4, $5, CURRENT_TIMESTAMP) RETURNING *",
    [userId, organisation, title, reference, sponsor]
  );
