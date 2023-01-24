const { db } = require("../utils");

exports.getAll = () => db.query("SELECT * FROM groups");

exports.create = (userId, { organisation, title, reference }) =>
  db.query(
    "INSERT INTO groups (creator, organisation, title, reference) VALUES ($1, $2, $3, $4) RETURNING *",
    [userId, organisation, title, reference]
  );
