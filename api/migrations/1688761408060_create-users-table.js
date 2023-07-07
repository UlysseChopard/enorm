/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = (pgm) => {
  pgm.createTable("users", {
    id: "id",
    society: {
      type: "id",
      notNull: true,
      references: "societies",
    },
    email: "text",
  });
};

exports.down = (pgm) => {
  pgm.dropTable("users");
};
