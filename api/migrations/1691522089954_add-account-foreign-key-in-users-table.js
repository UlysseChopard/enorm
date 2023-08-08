/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = (pgm) => {
  pgm.addColumn("users", { account: { type: "uuid", references: "accounts" } });
};

exports.down = (pgm) => {
  pgm.dropColumn("users", ["account"]);
};
