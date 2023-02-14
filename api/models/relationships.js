const { db } = require("../utils");

exports.send = (sender, recipient) =>
  db.query("INSERT INTO relationships (sender, recipient) VALUES ($1, $2)", [
    sender,
    recipient,
  ]);

exports.getSended = (sender) =>
  db.query("SELECT * FROM relationships WHERE sender = $1", [sender]);

exports.getReceived = (recipient) =>
  db.query("SELECT * FROM relationships WHERE recipient = $1", [recipient]);

exports.accept = (id) =>
  db.query(
    "UPDATE relationships SET accepted_at = CURRENT_TIMESTAMP WHERE id = $1",
    [id]
  );

exports.close = (id) =>
  db.query(
    "UPDATE relationships SET rejected_at = CURRENT_TIMESTAMP WHERE id = $1",
    [id]
  );
