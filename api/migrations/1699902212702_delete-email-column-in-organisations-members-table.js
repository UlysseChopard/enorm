/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = (pgm) => {
  pgm.dropColumn("organisations_members", "email");
};

exports.down = (pgm) => {
  pgm.addColumn("organisations_members", { email: { type: "text" } });
  pgm.sql(
    "UPDATE organisations_members SET email = (SELECT email FROM accounts WHERE accounts.id = organisations_members.account)"
  );
  pgm.alterColumn("organisations_members", "email", { notNull: true });
};
