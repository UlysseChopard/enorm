/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = (pgm) => {
  pgm.createTable("registrations_streams", {
    id: "id",
    wg_path: {
      type: "integer",
      references: "wg_paths",
      notNull: true,
      onDelete: "cascade",
    },
    registration: {
      type: "id",
      references: "registrations",
      notNull: true,
      onDelete: "cascade",
    },
  });
};

exports.down = (pgm) => {
  pgm.dropTable("registrations_streams");
};
