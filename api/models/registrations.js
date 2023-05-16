const { db } = require("../utils");

exports.getSended = (userId) =>
  db.query(
    "SELECT *, wg.id AS working_group FROM registrations AS r JOIN working_groups AS wg ON r.working_group = wg.id WHERE r.beneficiary = $1",
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

exports.find = id => db.query("SELECT * FROM registrations AS r WHERE r.id = $1", [id]);
