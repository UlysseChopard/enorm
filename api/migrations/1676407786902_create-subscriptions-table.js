/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = (pgm) => {
  pgm.createTable(
    "subscriptions",
    {
      id: "id",
      sender: {
        type: "uuid",
        references: "accounts",
        notNull: true,
      },
      recipient: {
        type: "uuid",
        references: "accounts",
        notNull: true,
      },
      sent_at: {
        type: "timestamptz",
        notNull: true,
        default: pgm.func("current_timestamp"),
      },
      received_at: "timestamptz",
      accepted_at: "timestamptz",
    },
    { constraints: { unique: ["sender", "recipient"] } }
  );
};

exports.down = (pgm) => {
  pgm.dropTable("subscriptions");
};
