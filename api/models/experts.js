const db = require("../db");

exports.createExpert = (id, { description, organisation }) =>
  db.query(
    "INSERT INTO experts (expert, description, organisation) VALUES ($1, $2, $3)",
    [id, description, organisation]
  );
