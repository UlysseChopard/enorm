const { db } = require("utils");

exports.getByAccount = (account) =>
  db.query("SELECT * FROM administration WHERE account = $1", [account]);

exports.addSuperuser = (account) =>
  db.query("INSERT INTO administration (account) VALUES ($1) RETURNING *", [
    account,
  ]);

exports.removeSuperuser = (id) =>
  db.query("DELETE FROM administration WHERE id = $1 RETURNING *", [id]);
