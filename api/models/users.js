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

exports.getBySociety = (organisation) =>
  db.query("SELECT email FROM users WHERE organisation = $1", [organisation]);
