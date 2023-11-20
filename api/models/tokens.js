const { db, crypt } = require("utils");

exports.get = (id) => db.query("SELECT id FROM tokens WHERE id = $1", [id]);

exports.getOne = async () => {
  let token;
  while (true) {
    token = crypt.getIntToken(parseInt(process.env.TOKEN_LENGTH, 10));
    const {
      rows: [found],
    } = await exports.get(token);
    if (!found) return token;
  }
};

exports.getByOrganisationMember = (om) =>
  db.query("SELECT id FROM tokens WHERE organisation_member = $1", [om]);

exports.create = ({ id, organisationMember, expiresAt }) =>
  db.query(
    "INSERT INTO tokens (id, organisation_member, expires_at) VALUES ($1, $2, $3) RETURNING *",
    [id, organisationMember, expiresAt]
  );

exports.createMany = (tokens) =>
  db.query(
    "INSERT INTO tokens (id, organisation_member, expires_at) SELECT u.id, u.organisation_member, u.expires_at FROM UNNEST($1::text[], $2::integer[], $3::timestamptz[]) AS u (id, organisation_member, expires_at)",
    [
      tokens.map(({ id }) => id),
      tokens.map(({ organisationMember }) => organisationMember),
      tokens.map(({ expiresAt }) => expiresAt),
    ]
  );

exports.remove = (id) =>
  db.query("DELETE FROM tokens WHERE id = $1 RETURNING *", [id]);

exports.removeExpired = () =>
  db.query(
    "DELETE FROM tokens WHERE expires_at < CURRENT_TIMESTAMP RETURNING *"
  );
