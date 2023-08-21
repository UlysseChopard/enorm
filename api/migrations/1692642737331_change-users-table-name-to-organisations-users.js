/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = (pgm) => {
  pgm.renameTable("users", "organisations_users");
};

exports.down = (pgm) => {
  pgm.renameTable("organisations_users", "users");
};
