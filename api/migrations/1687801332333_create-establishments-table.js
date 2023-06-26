/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = (pgm) => {
  pgm.createTable("establishments", {
    id: "id",
    admin: {
      type: "uuid",
      references: "accounts",
    },
    name: {
      type: "text",
      notNull: true,
    },
    address: {
      type: "text",
      notNull: true,
    },
    email: "text",
    phone: "text",
    created_at: "currentTs",
  });
};

exports.down = (pgm) => {
  pgm.dropTable("establishments");
};
