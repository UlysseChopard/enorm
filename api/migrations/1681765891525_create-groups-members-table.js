/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = (pgm) => {
  pgm.createTable("groups_members", {
    group: {
      type: "integer",
      references: "groups",
      notNull: true,
    },
    member: {
      type: "uuid",
      references: "accounts",
      notNull: true,
    },
    created_at: {
      type: "timestamptz",
      default: pgm.func("current_timestamp"),
      notNull: true,
    },
  });
};

exports.down = (pgm) => {
  pgm.dropTable("groups_members");
};
