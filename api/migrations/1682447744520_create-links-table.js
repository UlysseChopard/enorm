/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = (pgm) => {
  pgm.createTable("links", {
    id: "id",
    subscription: {
      type: "integer",
      references: "subscriptions",
      notNull: true,
    },
    working_group: {
      type: "integer",
      references: "working_groups",
      notNull: true,
    },
    registration: {
      type: "integer",
      references: "registrations",
    },
  });
};

exports.down = (pgm) => {
  pgm.dropTable("links");
};
