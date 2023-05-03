const { db } = require("../utils");

exports.getSended = (userId) =>
  db.query(
    "SELECT * FROM registrations WHERE beneficiary = $1 AND accepted_at IS NULL AND denied_at IS NULL",
    [userId]
  );

exports.getRequests = (userId) => db.query("SELECT r.* FROM registrations_streams AS rs JOIN registrations ON rs.registration = r.id WHERE rs.subscription IN (SELECT s.id FROM subscriptions AS s WHERE s.recipient = $1)", [userId]);

exports.request = ({ beneficiary, workingGroup }) =>
  db.query(
    "INSERT INTO registrations (beneficiary, working_group) VALUES ($1, $2) RETURNING *",
    [beneficiary, workingGroup]
  );

exports.accept = (id) =>
  db.query(
    "UPDATE registrations SET accepted_at = CURRENT_TIMESTAMP WHERE id = $1",
    [id]
  );

exports.deny = (id) =>
  db.query(
    "UPDATE registrations SET denied_at = CURRENT_TIMESTAMP WHERE id = $1",
    [id]
  );
