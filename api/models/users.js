const { db } = require("../utils");

exports.create = (organisation, email) =>
  db.query(
    "INSERT INTO users (organisation, email) VALUES ($1, $2) ON CONFLICT DO NOTHING RETURNING *",
    [organisation, email]
  );

exports.createMany = (organisation, emails) =>
  db.query(
    "INSERT INTO users (organisation, email) SELECT $1, unnest FROM UNNEST(ARRAY[string_to_array($2, ',')]) ON CONFLICT DO NOTHING RETURNING *",
    [organisation, emails.join(",")]
  );

exports.getByOrganisation = (organisation) =>
  db.query(
    "SELECT u.*, eu.establishment FROM users AS u LEFT JOIN establishments_users AS eu ON u.id = eu.user WHERE u.organisation = $1",
    [organisation]
  );

exports.deleteByIdAndOrganisation = (organisation, user) =>
  db.query(
    "DELETE FROM users WHERE organisation = $1 AND id = $2::INTEGER RETURNING *",
    [organisation, user]
  );

exports.setAdminByIdAndOrganisation = (organisation, user, value) =>
  db.query(
    "UPDATE users SET is_admin = $3 WHERE organisation = $1 AND id = $2",
    [organisation, user, value]
  );

exports.setExpertByIdAndOrganisation = (organisation, user, value) =>
  db.query(
    "UPDATE users SET is_expert = $3 WHERE organisation = $1 AND id = $2",
    [organisation, user, value]
  );

exports.setManagerByIdAndOrganisation = (organisation, user, value) =>
  db.query(
    "UPDATE users SET is_manager = $3 WHERE organisation = $1 AND id = $2",
    [organisation, user, value]
  );

exports.manageRoleByIdAndOrganisation = (
  organisation,
  user,
  { role, value }
) => {
  let colName;
  switch (role) {
    case "admin":
      colName = "is_admin";
      break;
    case "manager":
      colName = "is_manager";
      break;
    case "expert":
      colName = "is_expert";
      break;
    default:
      throw new Error("invalid role name");
  }
  return db.query(
    `UPDATE users SET ${colName} = $1 WHERE organisation = $2 AND id = $3`,
    [value, organisation, user]
  );
};

exports.linkAccountAsUser = (account, organisation) =>
  db.query(
    "UPDATE users SET account = $1 WHERE organisation = $2 AND email = (SELECT email FROM accounts WHERE id = $1)",
    [account, organisation]
  );

exports.unlinkAccountAsUser = (account, organisation) =>
  db.query(
    "UPDATE users SET account = NULL WHERE organisation = $1 AND account = $2",
    [organisation, account]
  );

exports.getByEmail = (email) =>
  db.query(
    "SELECT u.id, u.account, o.name, o.id AS organisation_id FROM users AS u JOIN organisations AS o ON u.organisation = o.id WHERE u.email = $1",
    [email]
  );
