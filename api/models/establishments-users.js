const { db } = require("../utils");

exports.deleteByUserAndEstablishment = (user, establishment) =>
  db.query(
    "DELETE FROM establishments_users WHERE user = $1 AND establishment = $2",
    [user, establishment]
  );

exports.modifyByIdAndOrganisation = (organisation, user, { establishment }) =>
  db.query(
    "INSERT INTO establishments_users (establishment, \"user\") SELECT $1, id FROM users AS u WHERE u.organisation = $2 AND u.id = $3",
    [establishment, organisation, user]
  );
