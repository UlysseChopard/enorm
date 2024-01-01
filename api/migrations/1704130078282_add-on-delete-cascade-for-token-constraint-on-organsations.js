/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = (pgm) => {
  pgm.dropConstraint("tokens", "tokens_organisation_member_fkey");
  pgm.addConstraint("tokens", "tokens_organisation_member_fkey", {
    foreignKeys: {
      columns: "organisation_member",
      references: "organisations_members",
      onDelete: "cascade",
    },
  });
};

exports.down = (pgm) => {
  pgm.dropConstraint("tokens", "tokens_organisation_member_fkey");
  pgm.addConstraint("tokens", "tokens_organisation_member_fkey", {
    foreignKeys: {
      columns: "organisation_member",
      references: "organisations_members",
    },
  });
};
