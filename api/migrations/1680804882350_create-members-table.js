/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = (pgm) => {
  pgm.createTable("members", {
    id: "id",
    account: {
      type: "uuid",
      references: "accounts",
      notNull: true,
    },
    member: {
      type: "uuid",
      references: "accounts",
    },
    email: "text",
    sended_at: {
      type: "timestamptz",
      notNull: true,
      default: pgm.func("current_timestamp"),
    },
    accepted_at: "timestamptz",
  });
  pgm.createIndex("members", ["member", "account"]);
};

exports.down = (pgm) => {
  pgm.dropIndex("members", ["member", "account"]);
  pgm.dropTable("members");
};
