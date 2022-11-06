-- Up Migration
CREATE TABLE experts (
  id SERIAL PRIMARY KEY,
  email TEXT NOT NULL,
  user_id INTEGER REFERENCES users (id),
  manager_id INTEGER REFERENCES users (id)
);
-- Down Migration
DROP TABLE experts;
