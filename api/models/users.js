const { db } = require("../utils");

exports.create = (society, email) =>
  db.query("INSERT INTO users (society, email) VALUES ($1, $2)", [
    society,
    email,
  ]);

exports.getBySociety = (society) =>
  db.query("SELECT email FROM users WHERE society = $1", [society]);
