const { db  } = require("../utils");

exports.getByEmail = email => db.query("SELECT * FROM accounts WHERE email = $1", [email]);

exports.getById = id => db.query("SELECT * FROM accounts WHERE id = $1", [id]);

exports.create = ({ email, hash, firstname, lastname }) => db.query("INSERT INTO accounts (email, hash, firstname, lastname) VALUES ($1, $2, $3, $4)", [email, hash, firstname, lastname]);

exports.update = (id, { email, hash, firstname, lastname }) => db.query("UPDATE accounts SET email = $1, hash = $2, firstname = $3, lastname = $4 WHERE id = $5", [email, hash, firstname, lastname, id]);

exports.close = id => db.query("DELETE FROM accounts WHERE id = $1", [id]);
