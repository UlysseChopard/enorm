const { db } = require("../utils");

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
