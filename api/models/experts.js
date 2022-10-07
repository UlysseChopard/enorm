const db = require("../db");

exports.fillProfile = (id, { description }) =>
  db.query("UPDATE experts SET description = $1 WHERE id = $2", [
    description,
    id,
  ]);

exports.activeAccount = (
  id,
  { firstName, lastName, civility, phoneNumber, password }
) =>
  db.query(
    "UPDATE experts SET first_name = $1, last_name = $2, civility = $3, phone_no = $4, password = $5 WHERE id = $6",
    [firstName, lastName, civility, phoneNumber, password, id]
  );

exports.declareExpert = ({ email, organisation, manager }) =>
  db.query(
    "INSERT INTO experts (email, organisation, manager) VALUES ($1, $2, $3, $4)",
    [email, organisation, manager, true]
  );
