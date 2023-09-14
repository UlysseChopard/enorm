/* eslint-disable camelcase */
const { PgLiteral } = require("node-pg-migrate");

exports.shorthands = undefined;

exports.up = (pgm) => {
  pgm.addColumn("organisations_users", {
    token: {
      type: "uuid",
      notNull: true,
      default: new PgLiteral("gen_random_uuid()"),
    },
  });
};

exports.down = (pgm) => {
  pgm.dropColumn("organisations_users", "token");
};
