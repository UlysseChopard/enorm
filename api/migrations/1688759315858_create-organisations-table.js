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
    name: {
      type: "text",
    },
  });
};

exports.down = (pgm) => {
  pgm.dropTable("organisations");
};
