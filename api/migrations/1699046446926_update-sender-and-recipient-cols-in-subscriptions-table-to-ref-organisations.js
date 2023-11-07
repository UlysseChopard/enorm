/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = (pgm) => {
  pgm.addConstraint("subscriptions", "suscriptions_sender_organisation_fkey", {
    foreignKeys: {
      columns: "sender",
      references: "organisations",
    },
  });
  pgm.addConstraint(
    "subscriptions",
    "suscriptions_recipient_organisation_fkey",
    {
      foreignKeys: {
        columns: "recipient",
        references: "organisations",
      },
    }
  );
};

exports.down = (pgm) => {
  pgm.dropConstraint("subscriptions", "suscriptions_sender_organisation_fkey", {
    foreignKeys: {
      columns: "sender",
      references: "organisations",
    },
  });
  pgm.dropConstraint(
    "subscriptions",
    "suscriptions_recipient_organisation_fkey",
    {
      foreignKeys: {
        columns: "recipient",
        references: "organisations",
      },
    }
  );
};
