const { db } = require("utils");

exports.create = ({ beneficiary, wgPath, wg }) =>
  db.query(
    "INSERT INTO registrations AS r (beneficiary, working_group) SELECT $1, wgp.working_group FROM wg_paths AS wgp WHERE wgp.id = $2 AND wgp.working_group = $3 RETURNING r.*",
    [beneficiary, wgPath, wg],
  );

exports.createOwn = ({ beneficiary, wg }) =>
  db.query(
    "INSERT INTO registrations (beneficiary, working_group, accepted_at) VALUES ($1, $2, CURRENT_TIMESTAMP) RETURNING *",
    [beneficiary, wg],
  );

exports.accept = (id) =>
  db.query(
    "UPDATE registrations SET accepted_at = CURRENT_TIMESTAMP WHERE id = $1 RETURNING *",
    [id],
  );

exports.deny = (id) =>
  db.query(
    "UPDATE registrations SET denied_at = CURRENT_TIMESTAMP WHERE id = $1 RETURNING *",
    [id],
  );

exports.find = (id) =>
  db.query(
    "SELECT DISTINCT r.*, rs.tint, a.firstname, a.lastname, wg.title, wg.organisation, s.sender AS last_forwarder FROM registrations AS r JOIN accounts AS a ON r.beneficiary = a.id JOIN working_groups AS wg ON r.working_group = wg.id LEFT JOIN registrations_streams rs ON r.id = rs.registration LEFT JOIN wg_paths wgp ON rs.wg_path = wgp.id LEFT JOIN subscriptions s ON wgp.subscription = s.id WHERE r.id = $1",
    [id],
  );

exports.removeBySubscription = (subscription) =>
  db.query(
    "DELETE FROM registrations WHERE id IN (SELECT registration FROM registrations_streams WHERE wg_path IN (SELECT id FROM wg_paths WHERE subscription = $1))",
    [subscription],
  );

exports.remove = (beneficiary, id) =>
  db.query("DELETE FROM registrations WHERE id = $1 AND beneficiary = $2", [
    id,
    beneficiary,
  ]);

exports.getOwn = (organisation) =>
  db.query(
    "SELECT r.*, wg.reference, wg.title, a.firstname, a.lastname, o.id AS organisation, o.name AS organisation_name FROM registrations AS r LEFT JOIN working_groups AS wg ON r.working_group = wg.id LEFT JOIN organisations_members om ON om.account = r.beneficiary LEFT JOIN organisations o ON om.organisation = o.id LEFT JOIN accounts a ON r.beneficiary = a.id WHERE om.organisation = $1",
    [organisation],
  );

exports.getFromManagedSubscriptions = (account) =>
  db.query(
    "SELECT r.*, s.recipient, s.sender, rs.wg_path, wgp.subscription, a.firstname, a.lastname, wg.reference, wg.title, o.id AS organisation, o.name AS organisation_name FROM registrations_streams rs LEFT JOIN wg_paths wgp ON rs.wg_path = wgp.id LEFT JOIN working_groups wg ON wgp.working_group = wg.id LEFT JOIN subscriptions_managers sm ON wgp.subscription = sm.subscription LEFT JOIN subscriptions s ON wgp.subscription = s.id LEFT JOIN registrations r ON rs.registration = r.id LEFT JOIN accounts a ON r.beneficiary = a.id LEFT JOIN organisations_members om ON r.beneficiary = om.account LEFT JOIN organisations o ON om.organisation = o.id LEFT JOIN organisations_members om2 ON sm.manager = om2.id WHERE om2.account = $1",
    [account],
  );

exports.getWgOrganisation = (id) =>
  db.query(
    "SELECT wg.organisation FROM registrations r JOIN working_groups wg ON r.working_group = wg.id WHERE r.id = $1",
    [id],
  );
