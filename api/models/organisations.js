const db = require("../db");
const format = require("pg-format");

const columns = [
  "id",
  "name",
  "members",
  "address_1",
  "postcode",
  "city",
  "country_code",
  "attached_to",
  "status",
  "address_2",
  "phone_no",
  "fax_no",
  "misc",
];

exports.insert = (data) =>
  db.query(
    format(
      `INSERT INTO organisations (%L) VALUES (%L)`,
      columns,
      columns.map((col) => data[col])
    )
  );

exports.getAll = () => db.query("SELECT * FROM organisations");
