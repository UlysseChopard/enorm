const { db } = require("../utils");

exports.modifyByIdAndOrganisation = (organisation, user, { establishment }) =>
  db.query(
    "INSERT INTO establishments_users (establishment, user) SELECT $1, id FROM users WHERE organisation = $2 AND id = $3",
    [establishment, organisation, user]
  );
