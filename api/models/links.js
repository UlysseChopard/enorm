const { db } = require("../utils");

exports.create = ({ subscription, recipient, sender }) =>
  db.query(
    "INSERT INTO links (working_group, subscription, recipient, sender) SELECT working_group, $1, $2, $3 FROM links WHERE recipient = $2 UNION SELECT id, $1::INTEGER, $2::UUID, $3::UUID FROM working_groups WHERE admin = $2",
    [subscription, recipient, sender]
  );

/*
exports.getRegistrations = (userId) =>
  db.query(
    "SELECT * FROM links AS l WHERE sender = $1 OR recipient = $1 JOIN registration AS r ON l.registration = r.id",
    [userId]
  );

exports.submitRegistration = ({
  registration,
  subscription,
  workingGroup,
  recipient,
  sender,
}) =>
  db.query(
    "INSERT INTO links (registration, subscription, working_group, recipient, sender) VALUES ($1, $2, $3, $4, $5)",
    [registration, subscription, workingGroup, recipient, sender]
  );
  */
