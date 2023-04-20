/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = (pgm) => {
  pgm.createTable("registrations", {
    id: "id",
    next_step: {
      type: "integer",
      references: "registrations",
    },
    working_group: {
      type: "integer",
      references: "working_groups",
      notNull: true,
      onDelete: "cascade",
    },
    decision_maker: {
      type: "uuid",
      references: "accounts",
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
    ended_at: "timestamptz",
  });
};

exports.down = (pgm) => {
  pgm.dropTable("registrations");
};
