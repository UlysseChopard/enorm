const { db } = require("../utils");

exports.getSended = (userId) =>
  db.query(
    "SELECT *, r.id AS id, wg.id AS working_group FROM registrations AS r JOIN working_groups AS wg ON r.working_group = wg.id WHERE r.beneficiary = $1",
    [userId]
  );

exports.create = ({ beneficiary, workingGroup }) =>
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

exports.getWG = (registration) =>
  db.query(
    "SELECT wg.admin FROM registrations AS r JOIN working_groups AS wg ON r.working_group = wg.id WHERE r.id = $1",
    [registration]
  );

exports.find = (id) =>
  db.query(
    "SELECT r.*, rs.wg_path, a.firstname, a.lastname FROM registrations AS r JOIN registrations_streams AS rs ON r.id = rs.registration JOIN wg_paths AS wgp ON rs.wg_path = wgp.id JOIN subscriptions AS s ON wgp.subscription = s.id JOIN accounts AS a ON s.recipient = a.id WHERE r.id = $1",
    [id]
  );

exports.removeBySubscription = (subscription) =>
  db.query(
    "DELETE FROM registrations WHERE id IN (SELECT registration FROM registrations_streams WHERE wg_path IN (SELECT id FROM wg_paths WHERE subscription = $1))",
    [subscription]
  );
