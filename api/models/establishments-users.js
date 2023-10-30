const { db } = require("utils");

exports.addAsAdmin = (admin, id, user) =>
  db.query(
    "INSERT INTO establishments_users (establishment, \"user\") SELECT $1, om.id FROM organisations_members AS om JOIN organisations AS o ON om.organisation = o.id  WHERE om.id = $2 AND o.admin = $3 RETURNING *",
    [id, user, admin]
  );

exports.removeAsAdmin = (admin, id, user) =>
  db.query(
    "DELETE FROM establishments_users WHERE establishment = $1 AND \"user\" = (SELECT om.id FROM organisations_members AS om JOIN organisations AS o ON om.organisation = o.id WHERE om.id = $2 AND o.admin = $3) RETURNING *",
    [id, user, admin]
  );
