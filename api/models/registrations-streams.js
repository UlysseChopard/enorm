const { db } = require("utils");

exports.forward = (registration, wgPath) =>
  db.query(
    "INSERT INTO registrations_streams (wg_path, registration) VALUES ($1, $2) RETURNING *",
    [wgPath, registration]
  );

