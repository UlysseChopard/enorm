-- Up Migration
CREATE TYPE role AS ENUM ('manager', 'expert');
CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    email TEXT,
    password VARCHAR(98) NOT NULL,
    role ROLE,
    UNIQUE(email, role)
);
-- Down Migration
DROP TABLE users;
DROP TYPE IF EXISTS role;