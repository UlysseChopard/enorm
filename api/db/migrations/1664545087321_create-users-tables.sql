-- Up Migration
CREATE TABLE admin.users (
    id SERIAL PRIMARY KEY,
    email TEXT NOT NULL UNIQUE,
    manager INTEGER REFERENCES admin.users (id),
    organisation INTEGER REFERENCES admin.organisations (id),
    password TEXT NOT NULL,
    first_name TEXT,
    last_name TEXT,
    phone_no TEXT,
    civility TEXT,
    is_manager BOOLEAN NOT NULL DEFAULT FALSE,
    is_expert BOOLEAN NOT NULL DEFAULT FALSE
);
-- Down Migration
DROP TABLE admin.users;