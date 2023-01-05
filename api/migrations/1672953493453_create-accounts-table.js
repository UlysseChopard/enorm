/* eslint-disable camelcase */

exports.shorthands = { id: { type: "uuid", primaryKey: true }, createdAt: { type: "timestamp", notNull: true, default: new PgLiteral("current_timestamp") } };

exports.up = pgm => {};

exports.down = pgm => {};
