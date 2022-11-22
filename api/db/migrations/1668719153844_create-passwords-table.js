/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = (pgm) => {
  pgm.createTable("passwords", {
    id: "id",
    account: {
      type: "INTEGER",
      references: "accounts",
    },
    hash: {
      type: "TEXT",
      noNull: true,
    },
    uuid: {
      type: "UUID",
      notNull: true,
    },
  });
};

exports.down = (pgm) => {
  pgm.dropTable("passwords");
};
