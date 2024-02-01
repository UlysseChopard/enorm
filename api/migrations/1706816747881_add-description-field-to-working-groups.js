/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = (pgm) => {
  pgm.addColumns("working_groups", { description: { type: "text" } });
};

exports.down = (pgm) => {
  pgm.dropColumns("working_groups", ["description"]);
};
