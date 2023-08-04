/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = (pgm) => {
  pgm.dropConstraint("users", "users_pkey", { cascade: true });
  pgm.addConstraint("users", "users_pkey", { primaryKey: "id" });
  pgm.createTable("establishments_users", {
    id: "id",
    establishment: {
      type: "integer",
      references: "establishments(id)",
      notNull: true,
    },
    user: {
      type: "integer",
      references: "users(id)",
      notNull: true,
    },
  });
};

exports.down = (pgm) => {
  pgm.dropTable("establishments_users");
  pgm.dropConstraint("users", "users_pkey", { cascade: true });
  pgm.addConstraint("users", "users_pkey", {
    primaryKey: ["id", "organisation"],
  });
};
