-- Up Migration
CREATE TABLE admin.experts (
    id SERIAL PRIMARY KEY,
    expert INTEGER REFERENCES admin.users (id),
    organisation INTEGER REFERENCES admin.organisations (id),
    description TEXT
);
-- Down Migration
DROP TABLE admin.experts;