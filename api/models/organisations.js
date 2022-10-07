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

exports.getAll = (manager) =>
  db.query("SELECT * FROM organisations WHERE manager = $1", [manager]);

exports.createParent = (manager, { name, address }) =>
  db.query(
    "INSERT INTO organisations (name, address, manager) VALUES ($1, $2, $3)",
    [name, address, manager]
  );

exports.createChild = (manager, { name, address, parent }) =>
  db.query(
    "INSERT INTO organisations (name, address, parent, manager) VALUES ($1, $2, $3, $4)",
    [name, address, parent, manager]
  );
