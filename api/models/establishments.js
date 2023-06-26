const { db } = require("../utils");

exports.getByAdmin = (userId) =>
  db.query("SELECT FROM establishments WHERE admin = $1", [userId]);

exports.closeAsAdmin = (userId, id) =>
  db.query("DELETE FROM establishments WHERE id = $1 AND admin = $2", [
    id,
    userId,
  ]);

exports.create = (userId, { name, address, email, phone }) =>
  db.query(
    "INSERT INTO establishments (admin, name, address, email, phone) VALUES ($1, $2, $3, $4, $5)",
    [userId, name, address, email, phone]
  );
