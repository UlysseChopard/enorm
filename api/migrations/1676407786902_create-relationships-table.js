/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = (pgm) => {
  pgm.createTable("relationships", {
    id: "id",
    sender: {
      type: "uuid",
      primaryKey: true,
      references: "accounts",
      notNull: true,
    },
    recipient: {
      type: "uuid",
      primaryKey: true,
      references: "accounts",
      notNull: true,
    },
    sended_at: {
      type: "timestamptz",
      notNull: true,
      default: pgm.func("current_timestamp"),
    },
    received_at: "timestamptz",
    accepted_at: "timestamptz",
    rejected_at: "timestamptz",
  });
};

exports.down = (pgm) => {
  pgm.dropTable("relationships");
};
