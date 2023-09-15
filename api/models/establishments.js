const { db } = require("utils");

exports.getByAdmin = (userId) =>
  db.query(
    "SELECT id, name, address, email, phone, created_at  FROM establishments WHERE admin = $1",
    [userId]
  );

exports.closeAsAdmin = (userId, id) =>
  db.query(
    "DELETE FROM establishments WHERE id = $1 AND admin = $2 RETURNING id, name, address, email, phone, created_at",
    [id, userId]
  );

exports.create = (userId, { name, address, email, phone }) =>
  db.query(
    "INSERT INTO establishments (admin, name, address, email, phone) VALUES ($1, $2, $3, $4, $5) RETURNING id, name, address, email, phone, created_at",
    [userId, name, address, email, phone]
  );

exports.replaceAsAdmin = (userId, id, { name, address, email, phone }) =>
  db.query(
    "UPDATE establishments SET name = $1, address = $2, email = $3, phone = $4 WHERE id = $5 AND admin = $6",
    [name, address, email, phone, id, userId]
  );
