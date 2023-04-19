/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = (pgm) => {
  pgm.createTable(
    "groups",
    {
      id: "id",
      created_at: "currentTs",
      creator: {
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
    },
    {
      constraints: {
        unique: ["reference", "organisation", "sponsor"],
      },
    }
  );
};

exports.down = (pgm) => {
  pgm.dropTable("groups");
};
