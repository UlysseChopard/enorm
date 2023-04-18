/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = (pgm) => {
  pgm.createTable("groups_members", {
    group_id: {
      type: "integer",
      references: "groups",
      notNull: true,
      onDelete: "cascade",
      primaryKey: true
    },
    account_id: {
      type: "uuid",
      references: "accounts",
      notNull: true,
      onDelete: "cascade",
      primaryKey: true
    },
    created_at: "currentTs",
    updated_at: "currentTs"
  });
};

exports.down = (pgm) => {
  pgm.dropTable("groups_members");
};
