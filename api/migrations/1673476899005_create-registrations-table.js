/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = pgm => {
  pgm.createType("status", ["canceled", "requested", "delisted", "approved", "denied"]);

  pgm.createTable("registrations", {
    id: "id",
    reference: {
      type: "text",
      notNull: true
    },
    label: "text",
    start: "date",
    end: "date",
    status: {
      type: "status",
      default: "requested"
    },
    user_id: {
      type: "userId",
      references: "accounts"
    }
  });
};

exports.down = pgm => {
  pgm.dropTable("registrations");
  pgm.dropType("status");
};
