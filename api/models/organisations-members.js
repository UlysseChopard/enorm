const { db } = require("utils");

exports.create = ({
  organisation,
  email,
  account,
  isAdmin = false,
  isExpert = false,
  isManager = false,
}) =>
  db.query(
    "INSERT INTO organisations_members (organisation, email, account, is_admin, is_expert, is_manager) VALUES ($1, $2, $3, $4, $5, $6) ON CONFLICT DO NOTHING RETURNING *",
    [organisation, email, account, isAdmin, isExpert, isManager]
  );

exports.createMany = (organisation, accounts) =>
  db.query(
    "INSERT INTO organisations_members (organisation, email, account) SELECT $1, u.email, u.account FROM UNNEST(ARRAY[string_to_array($2, ',')], '{$3}'::uuid[]) AS u (email, account) ON CONFLICT DO NOTHING RETURNING *",
    [
      organisation,
      accounts.map(({ email }) => email).join(","),
      accounts.map(({ id }) => id).join(","),
    ]
  );

exports.getByOrganisation = (organisation) =>
  db.query(
    "SELECT om.*, a.id AS account, t.id AS token, t.expires_at AS token_expires_at, eu.establishment FROM organisations_members AS om LEFT JOIN establishments_users AS eu ON om.id = eu.user JOIN accounts AS a ON om.account = a.id JOIN tokens AS t ON a.id = t.account WHERE om.organisation = $1",
    [organisation]
  );

exports.removeByOrganisation = (organisation) =>
  db.query(
    "DELETE FROM organisations_members WHERE organisation = $1 RETURNING *",
    [organisation]
  );

exports.deleteByIdAndOrganisation = (organisation, user) =>
  db.query(
    "DELETE FROM organisations_members WHERE organisation = $1 AND id = $2::INTEGER RETURNING *",
    [organisation, user]
  );

exports.setAdminByIdAndOrganisation = (organisation, user, value) =>
  db.query(
    "UPDATE organisations_members SET is_admin = $3 WHERE organisation = $1 AND id = $2",
    [organisation, user, value]
  );

exports.setExpertByIdAndOrganisation = (organisation, user, value) =>
  db.query(
    "UPDATE organisations_members SET is_expert = $3 WHERE organisation = $1 AND id = $2",
    [organisation, user, value]
  );

exports.setManagerByIdAndOrganisation = (organisation, user, value) =>
  db.query(
    "UPDATE organisations_members SET is_manager = $3 WHERE organisation = $1 AND id = $2",
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
    `UPDATE organisations_members SET ${colName} = $1 WHERE organisation = $2 AND id = $3`,
    [value, organisation, user]
  );
};

exports.setMemberAccount = (account, organisation) =>
  db.query(
    "UPDATE organisations_members SET account = $1 WHERE organisation = $2 AND email = (SELECT email FROM accounts WHERE id = $1)",
    [account, organisation]
  );

exports.getByEmail = (email) =>
  db.query(
    "SELECT o.id, o.name, om.account FROM organisations_members AS om RIGHT JOIN organisations AS o ON om.organisation = o.id WHERE om.email = $1",
    [email]
  );

exports.getRoles = (organisation, account) =>
  db.query(
    "SELECT is_manager, is_admin, is_expert FROM organisations_members WHERE account = $1 AND organisation = $2",
    [account, organisation]
  );

exports.checkToken = (token) =>
  db.query("SELECT * FROM organisations_members WHERE token = $1", [token]);
