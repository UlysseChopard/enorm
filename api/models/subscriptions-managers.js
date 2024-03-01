const { db } = require("utils");

exports.add = (subscription, manager) =>
  db.query(
    "INSERT INTO subscriptions_managers (subscription, manager) VALUES ($1, $2) ON CONFlICT DO NOTHING RETURNING *",
    [subscription, manager],
  );

exports.remove = (id) =>
  db.query("DELETE FROM subscriptions_managers WHERE id = $1", [id]);

exports.getBySubscription = (subscription, organisation) =>
  db.query(
    "SELECT sm.id, sm.manager, om.account, a.firstname, a.lastname FROM subscriptions_managers AS sm JOIN organisations_members AS om ON sm.manager = om.id JOIN accounts AS a ON om.account = a.id JOIN organisations AS o ON om.organisation = o.id WHERE sm.subscription = $1 AND o.id = $2",
    [subscription, organisation],
  );

exports.getByRegistration = (registration, organisation) =>
  db.query(
    "SELECT DISTINCT account FROM subscriptions_managers sm JOIN subscriptions s ON sm.subscription = s.id JOIN wg_paths wgp ON sm.subscription = wgp.subscription JOIN registrations r ON wgp.working_group = r.working_group JOIN organisations_members om ON sm.manager = om.id WHERE s.sender = $2 AND r.id = $1",
    [registration, organisation],
  );

exports.getByWgPath = (wgPath, organisation) =>
  db.query(
    "SELECT om.account FROM wg_paths AS wgp LEFT JOIN subscriptions_managers AS sm ON wgp.subscription = sm.subscription LEFT JOIN organisations_members AS om ON sm.manager = om.id LEFT JOIN organisations AS o ON om.organisation = o.id WHERE wgp.id = $1 AND o.id = $2",
    [wgPath, organisation],
  );

exports.isRegistrationManager = (registration, organisation, account) =>
  db.query(
    "SELECT DISTINCT om.account FROM registrations_streams AS rs LEFT JOIN wg_paths AS wgp ON rs.wg_path = wgp.id LEFT JOIN subscriptions_managers AS sm ON wgp.subscription = sm.subscription LEFT JOIN organisations_members AS om ON sm.manager = om.id LEFT JOIN organisations AS o ON om.organisation = o.id WHERE rs.registration = $1 AND o.id = $2 AND om.account = $3",
    [registration, organisation, account],
  );
