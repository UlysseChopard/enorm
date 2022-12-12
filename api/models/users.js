const { db } = require("../utils");

exports.create = (email, hash) => db.query("INSERT INTO users (email, hash) VALUES ($1, $2)", [email, hash]);

exports.getByEmail = (email) => db.query("SELECT * FROM users WHERE email = $1", [email]);
