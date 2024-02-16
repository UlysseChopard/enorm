/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = (pgm) => {
  pgm.addColumn("registrations_streams", {
    tint: { type: "integer", references: "organisations" },
  });
};

exports.down = (pgm) => {
  pgm.dropColumn("registrations_streams", "tint");
};
