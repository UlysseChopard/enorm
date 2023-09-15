const { db } = require("utils");

exports.addAsAdmin = (admin, id, user) =>
  db.query(
    "INSERT INTO establishments_users (establishment, \"user\") SELECT $1, u.id FROM users AS u JOIN organisations AS o ON u.organisation = o.id  WHERE u.id = $2 AND o.admin = $3 RETURNING *",
    [id, user, admin]
  );

exports.removeAsAdmin = (admin, id, user) =>
  db.query(
    "DELETE FROM establishments_users WHERE establishment = $1 AND \"user\" = (SELECT u.id FROM users AS u JOIN organisations AS o ON u.organisation = o.id WHERE u.id = $2 AND o.admin = $3) RETURNING *",
    [id, user, admin]
  );
