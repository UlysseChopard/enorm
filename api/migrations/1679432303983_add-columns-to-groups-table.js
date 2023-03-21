/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = (pgm) => {
  pgm.addColumns("groups", {
    disbanded_at: "timestamptz",
    open: {
      type: "boolean",
      default: true,
    },
    visible: {
      type: "boolean",
      default: true,
    },
  });
};

exports.down = (pgm) => {
  pgm.dropColumns("groups", ["disbanded_at", "open", "visible"]);
};
