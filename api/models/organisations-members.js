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
    "INSERT INTO organisations_members (organisation, email, account) SELECT $1, u.email, u.account FROM UNNEST($2::text[], $3::uuid[]) AS u (email, account) ON CONFLICT DO NOTHING RETURNING *",
    [
      organisation,
      accounts.map(({ email }) => email),
      accounts.map(({ id }) => id),
    ]
  );

exports.getByAccount = (id) =>
  db.query(
    "SELECT id, name, is_manager, is_admin, is_expert FROM organisations_members WHERE account = $1",
    [id]
  );

exports.isAdmin = (id) =>
  db.query(
    "SELECT TRUE FROM organisations_members WHERE id = $1 AND is_admin",
    [id]
  );

exports.getByOrganisation = (organisation) =>
  db.query(
    "SELECT om.*, t.id AS token, t.expires_at AS token_expires_at, eu.establishment FROM organisations_members AS om LEFT JOIN establishments_users AS eu ON om.id = eu.user LEFT JOIN tokens AS t ON om.id = t.organisation_member WHERE om.organisation = $1",
    [organisation]
  );

exports.deleteById = (id) =>
  db.query("DELETE FROM organisations_members WHERE id = $1 RETURNING *", [id]);

exports.grantRole = (id, role) =>
  db.query("UPDATE organisations_members SET $1 = TRUE WHERE id = $2", [
    role,
    id,
  ]);

exports.revokeRole = (id, role) =>
  db.query("UPDATE organisations_members SET $1 = FALSE WHERE id = $2", [
    role,
    id,
  ]);

exports.find = (id) =>
  db.query("SELECT account FROM organisations_members WHERE id = $1", [id]);

exports.getRoles = (organisation, account) =>
  db.query(
    "SELECT is_manager, is_admin, is_expert FROM organisations_members WHERE account = $1 AND organisation = $2",
    [account, organisation]
  );
