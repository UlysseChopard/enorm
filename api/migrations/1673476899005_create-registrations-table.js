/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = (pgm) => {
  pgm.createType("status", [
    "canceled",
    "requested",
    "delisted",
    "approved",
    "denied",
  ]);

  pgm.createTable("registrations", {
    id: "id",
    reference: {
      type: "text",
      notNull: true,
    },
    label: "text",
    start: "date",
    end: "date",
    status: {
      type: "status",
      default: "requested",
    },
    user_id: {
      type: "userId",
      references: "accounts",
    },
  });
  pgm.createIndex("registrations", "user_id");
};

exports.down = (pgm) => {
  pgm.dropIndex("registrations", "user_id");
  pgm.dropTable("registrations");
  pgm.dropType("status");
};
