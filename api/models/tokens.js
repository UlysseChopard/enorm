const { db } = require("utils");

exports.get = (id) => db.query("SELECT id FROM tokens WHERE id = $1", [id]);

exports.getByOrganisationMember = (om) =>
  db.query("SELECT id FROM tokens WHERE organisation_member = $1", [om]);

exports.create = ({ id, organisationMember, expiresAt }) =>
  db.query(
    "INSERT INTO tokens (id, organisation_member, expires_at) VALUES ($1, $2, $3) RETURNING *",
    [id, organisationMember, expiresAt]
  );

exports.remove = (id) =>
  db.query("DELETE FROM tokens WHERE id = $1 RETURNING *", [id]);

exports.removeExpired = () =>
  db.query(
    "DELETE FROM tokens WHERE expires_at < CURRENT_TIMESTAMP RETURNING *"
  );
