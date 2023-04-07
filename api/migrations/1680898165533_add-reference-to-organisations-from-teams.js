/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = (pgm) => {
  pgm.addColumn("teams", {
    organisation: { type: "integer", references: "organisations" },
  });
  pgm.addIndex("teams", "organisation");
};

exports.down = (pgm) => {
  pgm.dropIndex("teams", "organisation");
  pgm.dropColumn("teams", "organisation");
};
