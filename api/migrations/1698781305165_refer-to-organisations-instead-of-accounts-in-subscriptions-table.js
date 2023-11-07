/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = (pgm) => {
  pgm.dropColumn("subscriptions", ["sender", "recipient"]);
  pgm.addColumn("subscriptions", {
    sender: { type: "integer", notNull: true, reference: "organisations" },
    recipient: { type: "integer", notNull: true, reference: "organisations" },
  });
};

exports.down = (pgm) => {
  pgm.dropColumn("subscriptions", ["sender", "recipient"]);
  pgm.addColumn("subscriptions", {
    sender: { type: "uuid", notNull: true, reference: "accounts" },
    recipient: { type: "uuid", notNull: true, reference: "accounts" },
  });
};
