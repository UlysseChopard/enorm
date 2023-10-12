/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = (pgm) => {
  pgm.alterColumn("accounts", "hash", { allowNull: true });
};

exports.down = (pgm) => {
  pgm.alterColumn("accounts", "hash", { notNull: true });
};
