const { db } = require("../utils");

exports.create = (name) =>
  db.query("INSERT INTO companies (name) VALUES ($1) RETURNING id", [name]);
