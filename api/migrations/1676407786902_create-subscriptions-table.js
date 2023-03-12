/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = (pgm) => {
  pgm.createTable(
    "subscriptions",
    {
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
    },
    { constraints: { unique: ["sender", "recipient"] } }
  );
};

exports.down = (pgm) => {
  pgm.dropTable("subscriptions");
};
