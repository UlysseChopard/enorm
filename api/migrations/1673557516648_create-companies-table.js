/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = (pgm) => {
  pgm.createTable("companies", {
    id: "id",
    name: {
      type: "text",
      notNull: true,
    },
    creator: {
      type: "uuid",
      primaryKey: false,
      references: "accounts",
      notNull: true,
    },
  });
  pgm.createIndex("companies", "creator");
};

exports.down = (pgm) => {
  pgm.dropIndex("companies", "creator");
  pgm.dropTable("companies");
};
