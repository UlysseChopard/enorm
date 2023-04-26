const { db } = require("../utils");

exports.create = ({ subscription, recipient, sender }) =>
  db.query(
    "INSERT INTO links (working_group, subscription, recipient, sender) SELECT working_group, $1, $2, $3 FROM links WHERE recipient = $2",
    [subscription, recipient, sender]
  );

exports.remove = (subscription) =>
  db.query("DELETE FROM links WHERE subscription = $1", [subscription]);

exports.getRegistrations = (userId) =>
  db.query(
    "SELECT * FROM links AS l WHERE sender = $1 OR recipient = $1 JOIN registration AS r ON l.registration = r.id",
    [userId]
  );

exports.getGroups = (userId) =>
  db.query(
    "SELECT * FROM links AS l WHERE sender = $1 OR recipient = $1 JOIN working_groups AS wg ON l.working_group = wg.id",
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
