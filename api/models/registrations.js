const { db } = require("../utils");

exports.getSended = (userId) =>
  db.query("SELECT * FROM registrations WHERE beneficiary = $1", [userId]);

exports.getReceived = (userId) =>
  db.query(
    "SELECT r.* FROM registrations_streams AS rs JOIN registrations AS r ON rs.registration = r.id WHERE rs.wg_path IN (SELECT wgp.id FROM wg_paths AS wgp JOIN subscriptions AS s ON wgp.subscription = s.id  WHERE s.recipient = $1)",
    [userId]
  );

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

exports.forward = (wgPath, registration) =>
  db.query(
    "INSERT INTO registrations_streams (wg_path, registration) VALUES ($1, $2)",
    [wgPath, registration]
  );

exports.getWG = (registration) =>
  db.query(
    "SELECT wg.admin FROM registrations AS r JOIN working_groups AS wg ON r.working_group = wg.id WHERE r.id = $1",
    [registration]
  );
