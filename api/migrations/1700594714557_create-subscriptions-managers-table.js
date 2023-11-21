/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = (pgm) => {
  pgm.createTable("subscriptions_managers", {
    id: "id",
    subscription: {
      type: "integer",
      references: "subscriptions",
      notNull: true,
    },
    manager: {
      type: "integer",
      references: "organisations_members",
      notNull: true,
    },
  });
};

exports.down = (pgm) => {
  pgm.dropTable("subscriptions_managers");
};
