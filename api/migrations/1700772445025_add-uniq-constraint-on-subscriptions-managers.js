/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = (pgm) => {
  pgm.addConstraint("subscriptions_managers", "subscription_manager_uniq", {
    unique: ["subscription", "manager"],
  });
};

exports.down = (pgm) => {
  pgm.dropConstraint("subscriptions_managers", "subscription_manager_uniq");
};
