const { db } = require("../utils");

exports.update = (subscription, recipient) =>
  db.query(
    "INSERT INTO wg_paths (subscription, working_group) SELECT $1::INTEGER, id FROM working_groups WHERE admin = $2 UNION SELECT $1::INTEGER, working_group FROM wg_paths WHERE subscription IN (SELECT id FROM subscriptions WHERE sender = $2)",
    [subscription, recipient]
  );

exports.add = (subscription, wg) =>
  db.query(
    "INSERT INTO wg_paths (subscription, working_group) VALUES ($1, $2) ON CONFLICT DO NOTHING",
    [subscription, wg]
  );

exports.getNew = (recipient) =>
  db.query(
    "SELECT id FROM working_groups WHERE admin = $1 UNION SELECT working_group FROM wg_paths WHERE subscription IN (SELECT id FROM subscriptions WHERE sender = $1)",
    [recipient]
  );
