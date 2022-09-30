-- Up Migration
CREATE TABLE admin.managers (
    id SERIAL PRIMARY KEY,
    email TEXT NOT NULL UNIQUE,
    password TEXT NOT NULL,
    organisation INTEGER REFERENCES admin.organisations (id)
);
-- Down Migration
DROP TABLE admin.managers;