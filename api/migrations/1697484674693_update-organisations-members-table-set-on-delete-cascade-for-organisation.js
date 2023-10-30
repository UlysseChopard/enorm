/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = (pgm) => {
  pgm.addConstraint(
    "organisations_members",
    "users_organisation_fkey",
    {
      foreignKeys: {
        columns: "organisation",
        references: "organisations",
        onDelete: "cascade",
      },
    }
  );
};

exports.down = (pgm) => {
  pgm.dropConstraint("organisations_members", "users_organisation_fkey");
};
