/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = (pgm) => {
  pgm.createTable("subscriptions_organisations_members", {
    id: "id",
    subscription: {
      type: "id",
      references: "subscriptions",
      notNull: true,
    },
    organisation_member: {
      type: "id",
      references: "organisations_members",
      notNull: true,
    },
  });
};

exports.down = (pgm) => {
  pgm.dropTable("subscriptions_organisations_members");
};
