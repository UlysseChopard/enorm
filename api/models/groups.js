const { db } = require("../utils");

exports.getAll = () =>
  db.query(
    "SELECT g.organisation, g.reference, g.title, a.email FROM groups AS g INNER JOIN accounts AS a ON g.creator = a.id"
  );

exports.create = (userId, { organisation, title, reference, sponsor }) =>
  db.query(
    "INSERT INTO groups (creator, organisation, title, reference, sponsor) VALUES ($1, $2, $3, $4, $5) RETURNING *",
    [userId, organisation, title, reference, sponsor]
  );
