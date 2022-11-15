-- Up Migration
CREATE TABLE roles (
  id SERIAL PRIMARY KEY,
  email TEXT NOT NULL,
  user_id INTEGER REFERENCES users (id),
  sender_id INTEGER REFERENCES users (id),
  can_join_wg BOOLEAN NOT NULL DEFAULT FALSE,
  can_propose_wg BOOLEAN NOT NULL DEFAULT FALSE
);
-- Down Migration
DROP TABLE roles;
