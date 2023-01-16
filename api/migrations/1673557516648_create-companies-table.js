/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = pgm => {
  pgm.createTable("companies", {
    id: "id",
    name: "text",
    address: "text"
  });
  pgm.addColumn("accounts", {
    company: {
      primaryKey: false,
      references: "companies",
      type: "integer"
    }
  });
};

exports.down = pgm => {
  pgm.dropColumn("accounts", "company");
  pgm.dropTable("companies");
};
