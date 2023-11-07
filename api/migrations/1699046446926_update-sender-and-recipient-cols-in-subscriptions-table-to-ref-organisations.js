/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = (pgm) => {
  pgm.addConstraint("subscriptions", "suscriptions_sender_account_fkey", {
    foreignKeys: {
      columns: "sender",
      references: "accounts",
    },
  });
  pgm.addConstraint(
    "subscriptions",
    "suscriptions_recipient_accounts_fkey",
    {
      foreignKeys: {
        columns: "recipient",
        references: "accounts",
      },
    }
  );
};

exports.down = (pgm) => {
  pgm.dropConstraint("subscriptions", "suscriptions_sender_account_fkey");
  pgm.dropConstraint(
    "subscriptions",
    "suscriptions_recipient_account_fkey",
  );
};
