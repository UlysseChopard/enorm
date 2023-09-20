/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = (pgm) => {
  pgm.createTable("administration", {
    id: "id",
    account: { type: "uuid", notNull: true },
  });
};

exports.down = (pgm) => {
  pgm.dropTable("administration");
};
