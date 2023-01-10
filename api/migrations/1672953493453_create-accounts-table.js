/* eslint-disable camelcase */
const { PgLiteral } = require("node-pg-migrate");

exports.shorthands = { id: { type: "uuid", primaryKey: true, default: new PgLiteral("gen_random_uuid()") }, createdAt: { type: "timestamp", notNull: true, default: new PgLiteral("current_timestamp") } };

exports.up = pgm => {
  pgm.createType("gender", ["male", "female"]);

  pgm.createTable("accounts", {
    id: "id",
    firstname: "text",
    lastname: "text",
    email: {
      type: "text",
      notNull: true
    },
    gender: "gender",
    cellphone: "text",
    phone: "text",
    created_at: "createdAt",
    hash: {
      type: "text",
      notNull: true
    }
  });
};

exports.down = pgm => {
  pgm.dropTable("accounts");
  pgm.dropType("gender");
};
