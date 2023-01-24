/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = pgm => {
  pgm.createTable("groups", {
    id: "id",
    createdAt: "createdAt",
    creator: {
      type: "uuid",
      notNull: true,
      references: "accounts",
      onDelete: "cascade"
    },
    reference: {
      type: "text",
      notNull: true
    },
    organisation: {
      type: "text",
      notNull: true
    },
    title: {
      type: "text", 
      notNull: true
    }
  });
};

exports.down = pgm => {
  pgm.dropTable("groups");
};
