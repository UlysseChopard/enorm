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
    "SELECT r.*, a.firstname, a.lastname, wg.title FROM registrations AS r JOIN accounts AS a ON r.beneficiary = a.id JOIN working_groups AS wg ON r.working_group = wg.id WHERE r.id = $1",
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

exports.getOwn = (wg) =>
  db.query(
    "SELECT r.*, wg.reference, wg.title, a.firstname, a.lastname FROM registrations AS r LEFT JOIN working_groups AS wg ON r.working_group = wg.id LEFT JOIN organisations_members om ON om.account = r.beneficiary LEFT JOIN accounts a ON r.beneficiary = a.id WHERE om.organisation = $1",
    [wg],
  );

exports.getFromManagedSubscriptions = (account) =>
  db.query(
    "SELECT r.*, s.recipient, s.sender, rs.wg_path, wgp.subscription, a.firstname, a.lastname, wg.reference, wg.title FROM registrations AS r LEFT JOIN working_groups AS wg ON r.working_group = wg.id LEFT JOIN registrations_streams AS rs ON r.id = rs.registration LEFT JOIN wg_paths AS wgp ON rs.wg_path = wgp.id LEFT JOIN accounts AS a ON r.beneficiary = a.id LEFT JOIN subscriptions AS s ON wgp.subscription = s.id WHERE wgp.subscription IN (SELECT wgp.subscription FROM wg_paths AS wgp WHERE wgp.subscription IN (SELECT sm.subscription FROM subscriptions_managers AS sm WHERE sm.manager IN (SELECT om.id FROM organisations_members AS om WHERE om.account = $1)))",
    [account],
  );
