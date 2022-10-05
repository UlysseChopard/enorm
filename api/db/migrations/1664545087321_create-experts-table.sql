-- Up Migration
CREATE TABLE admin.users (
    id SERIAL PRIMARY KEY,
    email TEXT NOT NULL UNIQUE,
    first_name TEXT NOT NULL,
    last_name TEXT NOT NULL,
    password TEXT NOT NULL,
    organisation INTEGER REFERENCES admin.organisations (id),
    is_expert BOOLEAN DEFAULT FALSE,
    is_manager BOOLEAN DEFAULT FALSE
);
-- Down Migration
DROP TABLE admin.users;