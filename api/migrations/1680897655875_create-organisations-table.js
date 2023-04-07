/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = (pgm) => {
  pgm.createTable("organisations", {
    id: "id",
    admin: {
      type: "uuid",
      references: "accounts",
      notNull: true,
    },
    name: "text",
    address: "text",
  });
  pgm.createIndex("organisations", "admin");
};

exports.down = (pgm) => {
  pgm.dropIndex("organisations", "admin");
  pgm.dropTable("organisations");
};
