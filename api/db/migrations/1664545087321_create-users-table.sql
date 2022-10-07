-- Up Migration
CREATE TABLE admin.users (
    id SERIAL PRIMARY KEY,
    email TEXT NOT NULL UNIQUE,
    organisation INTEGER REFERENCES admin.organisations (id),
    is_expert BOOLEAN DEFAULT FALSE,
    is_manager BOOLEAN DEFAULT FALSE,
    first_name TEXT,
    last_name TEXT,
    password TEXT,
    phone_no TEXT,
    civility TEXT
);
-- Down Migration
DROP TABLE admin.users;