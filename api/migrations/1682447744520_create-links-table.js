/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = (pgm) => {
  pgm.createTable("links", {
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
    registration: {
      type: "integer",
      references: "registrations",
      onDelete: "cascade"
    },
    recipient: {
      type: "uuid",
      references: "accounts",
      notNull: true,
      onDelete: "cascade"
    },
    sender: {
      type: "uuid",
      references: "accounts",
      notNull: true,
      onDelete: "cascade"
    },
  });
};

exports.down = (pgm) => {
  pgm.dropTable("links");
};
