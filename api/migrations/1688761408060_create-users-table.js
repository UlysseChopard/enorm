/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = (pgm) => {
  pgm.createTable(
    "users",
    {
      id: "id",
      organisation: {
        type: "id",
        notNull: true,
        references: "organisations",
      },
      email: {
        type: "text",
        notNull: true,
      },
    },
    { constraints: { unique: ["email", "organisation"] } }
  );
};

exports.down = (pgm) => {
  pgm.dropTable("users");
};
