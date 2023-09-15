/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = (pgm) => {
  pgm.renameTable("users", "organisations_members");
};

exports.down = (pgm) => {
  pgm.renameTable("organisations_members", "users");
};
