const { db } = require("../utils");

exports.get = (userId) =>
  db.query(
    "SELECT * FROM registrations AS r JOIN accounts AS a ON r.beneficiary = a.id AND r.decision_maker = $1 OR r.decision_maker = a.id AND r.beneficiary = $1 JOIN working_groups AS wg ON r.working_group = wg.id",
    [userId]
  );

exports.ask = ({ beneficiary, decisionMaker, workingGroup, prevStep = null }) =>
  db.query(
    "INSERT INTO registrations (beneficiary, working_group, decision_maker, prev_step) VALUES ($1, $2, $3, $4) RETURNING *",
    [beneficiary, workingGroup, decisionMaker, prevStep]
  );

exports.accept = ({ beneficiary, workingGroup }) =>
  db.query(
    "UPDATE registrations SET accepted_at = CURRENT_TIMESTAMP WHERE beneficiary = $1 AND working_group = $2",
    [beneficiary, workingGroup]
  );

exports.deny = ({ beneficiary, workingGroup }) =>
  db.query(
    "UPDATE registrations SET denied_at = CURRENT_TIMESTAMP WHERE beneficiary = $1 AND working_group = $2",
    [beneficiary, workingGroup]
  );
