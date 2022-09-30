-- Up Migration
CREATE TABLE admin.experts (
    id SERIAL PRIMARY KEY,
    email TEXT NOT NULL UNIQUE,
    password TEXT NOT NULL,
    organisation INTEGER REFERENCES organisations (id),
);
-- Down Migration
DROP TABLE admin.experts;