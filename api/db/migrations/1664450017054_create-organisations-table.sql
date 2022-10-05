-- Up Migration
CREATE TABLE admin.organisations (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    address TEXT NOT NULL,
    parent INTEGER REFERENCES admin.organisations (id),
    UNIQUE (name, address)
);
-- Down Migration
DROP TABLE admin.organisations;