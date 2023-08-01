/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = (pgm) => {
  pgm.addColumns("users", {
    is_manager: {
      type: "boolean",
      default: false,
      notNull: true,
    },
    is_expert: {
      type: "boolean",
      default: false,
      notNull: true,
    },
    is_admin: {
      type: "boolean",
      default: false,
      notNull: true,
    },
  });
};

exports.down = (pgm) => {
  pgm.dropColumns("users", ["is_manager", "is_expert", "is_admin"]);
};
