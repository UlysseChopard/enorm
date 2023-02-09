/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = (pgm) => {
  pgm.createTable("companies", {
    id: "id",
    name: "text",
  });
  pgm.addColumn("accounts", {
    company: {
      primaryKey: false,
      references: "companies",
      type: "integer",
    },
  });
  pgm.createIndex("accounts", "company");
};

exports.down = (pgm) => {
  pgm.dropIndex("accounts", "company");
  pgm.dropColumn("accounts", "company");
  pgm.dropTable("companies");
};
