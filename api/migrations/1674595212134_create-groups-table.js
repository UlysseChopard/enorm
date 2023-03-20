/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = (pgm) => {
  pgm.createTable(
    "groups",
    {
      id: "id",
      createdAt: "createdAt",
      creator: {
        type: "uuid",
        references: "accounts",
      },
      sponsor: {
        type: "integer",
        notNull: true,
        references: "companies",
        onDelete: "cascade",
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
  pgm.createIndex("groups", ["sponsor", "creator"]);
};

exports.down = (pgm) => {
  pgm.dropIndex("groups", ["sponsor", "creator"]);
  pgm.dropTable("groups");
};
