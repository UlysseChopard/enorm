const { db } = require("../utils");

exports.getReceived = (userId) =>
  db.query(
    "SELECT r.* FROM registrations_streams AS rs JOIN registrations AS r ON rs.registration = r.id WHERE rs.wg_path IN (SELECT wgp.id FROM wg_paths AS wgp JOIN subscriptions AS s ON wgp.subscription = s.id  WHERE s.recipient = $1)",
    [userId]
  );

exports.forward = (registration, wgPath) =>
  db.query(
    "INSERT INTO registrations_streams (wg_path, registration) VALUES ($1, $2) RETURNING *",
    [wgPath, registration]
  );
