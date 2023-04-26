/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = (pgm) => {
  pgm.createTable("registrations", {
    id: "id",
    working_group: {
      type: "integer",
      references: "working_groups",
      notNull: true,
      onDelete: "cascade",
    },
    beneficiary: {
      type: "uuid",
      references: "accounts",
      notNull: true,
      onDelete: "cascade",
    },
    created_at: "currentTs",
    accepted_at: "timestamptz",
    denied_at: "timestamptz",
  });
};

exports.down = (pgm) => {
  pgm.dropTable("registrations");
};
