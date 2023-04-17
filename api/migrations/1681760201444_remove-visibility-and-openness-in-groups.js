/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = (pgm) => {
  pgm.dropColumns("groups", ["open", "visible"]);
};

exports.down = (pgm) => {
  pgm.addColumns("groups", {
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
