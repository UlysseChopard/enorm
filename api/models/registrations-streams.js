const { db } = require("utils");

exports.getReceived = (organisation) =>
  db.query(
    "SELECT *, r.id, rs.id AS registration_stream_id, wgp_one.id AS wg_path_id, wg.id AS working_group_id, a.id AS account_id, a.firstname, a.lastname FROM registrations_streams AS rs JOIN registrations AS r ON rs.registration = r.id JOIN accounts AS a ON r.beneficiary = a.id JOIN wg_paths AS wgp_one ON rs.wg_path = wgp_one.id JOIN working_groups AS wg ON wgp_one.working_group = wg.id WHERE rs.wg_path IN (SELECT id FROM wg_paths AS wgp_two WHERE wgp_two.subscription IN (SELECT id FROM subscriptions AS s WHERE s.recipient = $1));",
    [organisation]
  );

exports.forward = (registration, wgPath) =>
  db.query(
    "INSERT INTO registrations_streams (wg_path, registration) VALUES ($1, $2) RETURNING *",
    [wgPath, registration]
  );
