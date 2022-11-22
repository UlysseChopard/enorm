/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = (pgm) => {
  pgm.createTable("accounts", {
    id: "id",
    email: { type: "TEXT", unique: true, notNull: true },
    first_name: { type: "TEXT", notNull: true },
    last_name: { type: "TEXT", notNull: true },
  });
};

exports.down = (pgm) => {
  pgm.dropTable("accounts");
};
