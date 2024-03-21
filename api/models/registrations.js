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

exports.getBySubscriptionManager = (organisation, account) =>
  db.query(
    `SELECT DISTINCT r.id, r.created_at, r.accepted_at, r.denied_at, (s.sender = $1) forwarded, (s.recipient = $1) received, a.firstname, a.lastname, wg.title, wg.reference, o0.name represented_organisation_name, o1.name beneficiary_organisation_name
    FROM registrations r
    LEFT JOIN registrations_streams rs ON r.id = rs.registration
    LEFT JOIN wg_paths wgp ON rs.wg_path = wgp.id
    LEFT JOIN subscriptions_managers sm ON wgp.subscription = sm.subscription
    LEFT JOIN organisations_members om0 ON sm.manager = om0.id
    LEFT JOIN subscriptions s ON sm.subscription = s.id
    LEFT JOIN accounts a ON r.beneficiary = a.id
    LEFT JOIN working_groups wg ON wgp.working_group = wg.id
    LEFT JOIN organisations o0 ON rs.tint = o0.id
    LEFT JOIN organisations_members om1 ON r.beneficiary = om1.account
    LEFT JOIN organisations o1 ON om1.organisation = o1.id
    WHERE om0.account = $2
    ORDER BY r.created_at DESC`,
    [organisation, account],
  );

exports.getWgOrganisation = (id) =>
  db.query(
    "SELECT wg.organisation FROM registrations r JOIN working_groups wg ON r.working_group = wg.id WHERE r.id = $1",
    [id],
  );
