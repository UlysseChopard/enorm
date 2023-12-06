const { db } = require("utils");

exports.add = (subscription, manager) =>
  db.query(
    "INSERT INTO subscriptions_managers (subscription, manager) VALUES ($1, $2) ON CONFlICT DO NOTHING RETURNING *",
    [subscription, manager]
  );

exports.remove = (id) =>
  db.query("DELETE FROM subscriptions_managers WHERE id = $1", [id]);

exports.getBySubscription = (subscription) =>
  db.query(
    "SELECT sm.id, sm.manager, om.account, a.firstname, a.lastname FROM subscriptions_managers AS sm JOIN organisations_members AS om ON sm.manager = om.id JOIN accounts AS a ON om.account = a.id WHERE sm.subscription = $1",
    [subscription]
  );

exports.getByRegistration = (registration) =>
  db.query(
    "SELECT om.account FROM registrations_streams AS rs LEFT JOIN wg_paths AS wgp ON rs.wg_path = wgp.id LEFT JOIN subscriptions_managers AS sm ON wgp.subscription = sm.subscription LEFT JOIN organisations_members AS om ON sm.manager = om.id WHERE rs.registration = $1",
    [registration]
  );

exports.getByWgPath = (wgPath) =>
  db.query(
    "SELECT om.account FROM wg_paths AS wgp LEFT JOIN subscriptions_managers AS sm ON wgp.subscription = sm.subscription LEFT JOIN organisations_members AS om ON sm.manager = om.id WHERE wgp.id = $1",
    [wgPath]
  );
