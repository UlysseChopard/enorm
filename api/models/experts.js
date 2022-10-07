const db = require("../db");

exports.fillProfile = (id, { description }) =>
  db.query("INSERT INTO experts (expert, description) VALUES ($1, $2)", [
    id,
    description,
  ]);
