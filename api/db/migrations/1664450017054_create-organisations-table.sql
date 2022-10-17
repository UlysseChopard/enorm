-- Up Migration
CREATE TABLE organisations (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    address TEXT NOT NULL,
    parent INTEGER REFERENCES organisations (id),
    UNIQUE (name, address)
);
-- Down Migration
DROP TABLE organisations;