const db = require("../db");

exports.create = ({ email, password, role }) =>
  db.query("INSERT INTO users (email, password, role) VALUES ($1, $2, $3)", [
    email,
    password,
    role,
  ]);

exports.getAll = () => db.query("SELECT email, password, role FROM users");

exports.getById = (id) =>
  db.query("SELECT email, passord, role FROM users WHERE id = $1", [id]);
