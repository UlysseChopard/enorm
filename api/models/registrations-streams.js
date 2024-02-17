const { db } = require("utils");

exports.forward = (registration, wgPath, organisation) =>
  db.query(
    "INSERT INTO registrations_streams (wg_path, registration, organisation) VALUES ($1, $2, $3) RETURNING *",
    [wgPath, registration, organisation],
  );

exports.managers = (registration) =>
  db.query(
    "SELECT om.account, om.organisation, wg.organisation AS end_organisation FROM registrations_streams AS rs JOIN wg_paths AS wgp ON rs.wg_path = wgp.id JOIN working_groups AS wg ON wgp.working_group = wg.id JOIN subscriptions_managers AS sm ON wgp.subscription = sm.subscription JOIN organisations_members AS om ON sm.manager = om.id WHERE rs.registration = $1",
    [registration],
  );
