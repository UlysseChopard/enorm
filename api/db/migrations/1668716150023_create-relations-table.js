/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = (pgm) => {
  pgm.createTable("relations", {
    id: "id",
    emitter: {
      type: "INTEGER",
      references: "accounts",
    },
    receiver: {
      type: "INTEGER",
      references: "accounts",
    },
    can_register_self: {
      type: "boolean",
      notNull: true,
      default: "FALSE",
    },
    can_register_relations: {
      type: "boolean",
      notNull: true,
      default: "FALSE",
    },
  });
};

exports.down = (pgm) => {
  pgm.dropTable("relations");
};
