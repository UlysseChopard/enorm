/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = (pgm) => {
  pgm.createTable("wg_paths", {
    id: "id",
    subscription: {
      type: "integer",
      references: "subscriptions",
      notNull: true,
      onDelete: "cascade"
    },
    working_group: {
      type: "integer",
      references: "working_groups",
      notNull: true,
      onDelete: "cascade"
    },
  });
};

exports.down = (pgm) => {
  pgm.dropTable("wg_paths");
};
