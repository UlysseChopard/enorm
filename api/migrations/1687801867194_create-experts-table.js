/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = (pgm) => {
  pgm.createTable("experts", {
    id: "id",
    account: {
      type: "uuid",
      references: "accounts",
      notNull: true,
    },
    establishment: {
      type: "id",
      references: "establishments",
      notNull: true,
    },
  });
};

exports.down = (pgm) => {
  pgm.dropTable("experts");
};
