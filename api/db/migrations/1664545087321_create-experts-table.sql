-- Up Migration
CREATE TYPE admin.roles AS ENUM ('expert', 'manager');
CREATE TABLE admin.users (
    id SERIAL PRIMARY KEY,
    first_name TEXT NOT NULL,
    last_name TEXT NOT NULL,
    email TEXT NOT NULL UNIQUE,
    password TEXT NOT NULL,
    organisation INTEGER REFERENCES admin.organisations (id),
    roles ADMIN.ROLES [] NOT NULL
);
-- Down Migration
DROP TYPE admin.roles CASCADE;
DROP TABLE admin.users;