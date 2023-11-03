/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = (pgm) => {
  pgm.dropColumns("working_groups", ["admin", "organisation"]);
  pgm.addColumn("working_groups", {
    organisation: {
      type: "integer",
      references: "organisations",
    },
  });
};

exports.down = (pgm) => {
  pgm.dropColumn("working_groups", "organisation");
  pgm.addColumn("working_groups", { organisation: { type: "text" } });
  pgm.addColumn("working_groups", {
    admin: { type: "uuid", references: "accounts" },
  });
};
