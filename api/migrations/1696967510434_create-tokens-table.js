/* eslint-disable camelcase */

exports.up = (pgm) => {
  pgm.createTable("tokens", {
    id: {
      primaryKey: true,
      type: "text",
    },
    account: {
      type: "uuid",
      notNull: true,
      unique: true,
    },
    created_at: "currentTs",
    expires_at: {
      type: "timestamptz",
      notNull: true,
    },
  });
};

exports.down = (pgm) => {
  pgm.dropTable("tokens");
};
