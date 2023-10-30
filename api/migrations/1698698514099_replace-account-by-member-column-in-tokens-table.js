/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = (pgm) => {
  pgm.dropColumn("tokens", "account");
  pgm.addColumn("tokens", {
    organisation_member: {
      type: "integer",
      references: "organisations_members",
      notNull: true,
    },
  });
};

exports.down = (pgm) => {
  pgm.dropColumn("tokens", "organisation_member");
  pgm.addColumn("tokens", {
    account: {
    type: "uuid",
    references: "accounts",
    notNull: true,
    }
  });
};
