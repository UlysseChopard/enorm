/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = async (pgm) => {
  pgm.addColumn("registrations_streams", {
    tint: { type: "integer", references: "organisations" },
  });
  pgm.sql(
    "UPDATE registrations_streams SET tint = om.organisation FROM registrations_streams rs JOIN registrations r ON rs.registration = r.id JOIN organisations_members om ON r.beneficiary = om.account",
  );
  pgm.alterColumn("registrations_streams", "tint", { notNull: true });
};

exports.down = (pgm) => {
  pgm.dropColumn("registrations_streams", "tint");
};
