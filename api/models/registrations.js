const { db } = require("utils");

exports.getSent = (userId) =>
  db.query(
    "SELECT *, r.id AS id, wg.id AS working_group_id, a.id AS account_id, a.firstname, a.lastname FROM registrations AS r JOIN accounts AS a ON r.beneficiary = a.id JOIN working_groups AS wg ON r.working_group = wg.id WHERE r.beneficiary = $1",
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
    "UPDATE registrations SET denied_at = CURRENT_TIMESTAMP WHERE id = $1 RETURNING *",
    [id]
  );

exports.getWG = (registration) =>
  db.query(
    "SELECT wg.admin FROM registrations AS r JOIN working_groups AS wg ON r.working_group = wg.id WHERE r.id = $1",
    [registration]
  );

exports.find = (id) =>
  db.query(
    "SELECT r.*, a.firstname, a.lastname FROM registrations AS r JOIN accounts AS a ON r.beneficiary = a.id WHERE r.id = $1",
    [id]
  );

exports.removeBySubscription = (subscription) =>
  db.query(
    "DELETE FROM registrations WHERE id IN (SELECT registration FROM registrations_streams WHERE wg_path IN (SELECT id FROM wg_paths WHERE subscription = $1))",
    [subscription]
  );

exports.remove = (beneficiary, id) =>
  db.query("DELETE FROM registrations WHERE id = $1 AND beneficiary = $2", [
    id,
    beneficiary,
  ]);
