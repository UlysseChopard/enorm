const { db } = require("utils");
const { Client } = require("pg");
const { escapeIdentifier } = new Client();

exports.create = ({
  organisation,
  account,
  isAdmin = false,
  isExpert = false,
  isManager = false,
}) =>
  db.query(
    "INSERT INTO organisations_members (organisation, account, is_admin, is_expert, is_manager) VALUES ($1, $2, $3, $4, $5) ON CONFLICT DO NOTHING RETURNING *",
    [organisation, account, isAdmin, isExpert, isManager]
  );

exports.createMany = (organisation, accounts) =>
  db.query(
    "INSERT INTO organisations_members (organisation, account) SELECT $1, * FROM UNNEST($2::uuid[]) ON CONFLICT DO NOTHING RETURNING id",
    [organisation, accounts]
  );

exports.getByAccount = (id) =>
  db.query(
    "SELECT om.id, om.organisation, om.is_manager, om.is_admin, om.is_expert, o.name FROM organisations_members AS om JOIN organisations AS o ON om.organisation = o.id WHERE account = $1",
    [id]
  );

exports.isAdmin = (id) =>
  db.query(
    "SELECT TRUE FROM organisations_members WHERE id = $1 AND is_admin",
    [id]
  );

exports.getByOrganisation = (organisation) =>
  db.query(
    "SELECT om.*, t.id AS token, t.expires_at AS token_expires_at, eu.establishment, a.email, a.firstname, a.lastname FROM organisations_members AS om LEFT JOIN establishments_users AS eu ON om.id = eu.user LEFT JOIN tokens AS t ON om.id = t.organisation_member JOIN accounts AS a ON om.account = a.id WHERE om.organisation = $1",
    [organisation]
  );

exports.deleteById = (id) =>
  db.query("DELETE FROM organisations_members WHERE id = $1 RETURNING *", [id]);

exports.grantRole = (id, role) =>
  db.query(
    `UPDATE organisations_members SET ${escapeIdentifier(
      role
    )} = TRUE WHERE id = $1`,
    [id]
  );

exports.revokeRole = (id, role) =>
  db.query(
    `UPDATE organisations_members SET ${escapeIdentifier(
      role
    )} = FALSE WHERE id = $1`,
    [id]
  );

exports.find = (id) =>
  db.query("SELECT account FROM organisations_members WHERE id = $1", [id]);

exports.getRoles = (organisation, account) =>
  db.query(
    "SELECT is_manager, is_admin, is_expert FROM organisations_members WHERE account = $1 AND organisation = $2",
    [account, organisation]
  );
