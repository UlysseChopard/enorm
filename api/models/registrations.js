const { db } = require("../utils");

exports.ask = ({ beneficiary, decisionMaker, group, prevStep = null }) =>
  db.query(
    "INSERT INTO registrations (beneficiary, working_group, decision_maker, prev_step) VALUES ($1, $2, $3, $4) RETURNING *",
    [beneficiary, group, decisionMaker, prevStep]
  );

exports.accept = ({ beneficiary, group }) =>
  db.query(
    "UPDATE registrations SET accepted_at = CURRENT_TIMESTAMP WHERE beneficiary = $1 AND group = $2"[
      (beneficiary, group)
    ]
  );

exports.deny = ({ beneficiary, group }) =>
  db.query(
    "UPDATE registrations SET ended_at = CURRENT_TIMESTAMP WHERE beneficiary = $1 AND group = $2",
    [beneficiary, group]
  );
