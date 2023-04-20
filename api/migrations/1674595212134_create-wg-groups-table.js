/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = (pgm) => {
  pgm.createTable(
    "working_groups",
    {
      id: "id",
      admin: {
        type: "uuid",
        references: "accounts",
      },
      reference: {
        type: "text",
        notNull: true,
      },
      organisation: {
        type: "text",
        notNull: true,
      },
      title: {
        type: "text",
      },
      created_at: "currentTs",
      disbanded_at: "timestamptz"
    },
    {
      constraints: {
        unique: ["reference", "organisation"],
      },
    }
  );
};

exports.down = (pgm) => {
  pgm.dropTable("working_groups");
};
