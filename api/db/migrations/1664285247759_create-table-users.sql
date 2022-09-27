-- Up Migration
CREATE TABLE IF NOT EXISTS users (
    ID SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL,
    password VARCHAR(98) NOT NULL,
    UNIQUE(password, email)
);
-- Down Migration
DROP TABLE users;