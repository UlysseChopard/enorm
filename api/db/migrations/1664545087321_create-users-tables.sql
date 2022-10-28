-- Up Migration
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    email TEXT NOT NULL UNIQUE,
    uuid UUID NOT NULL UNIQUE,
    manager INTEGER REFERENCES users (id),
    organisation INTEGER REFERENCES organisations (id),
    password TEXT NOT NULL,
    first_name TEXT,
    last_name TEXT,
    phone_no TEXT,
    civility TEXT,
    is_activated BOOLEAN NOT NULL DEFAULT FALSE
);
-- Down Migration
DROP TABLE users;
