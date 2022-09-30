-- Up Migration
CREATE TABLE admin.organisations (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    members BOOLEAN NOT NULL DEFAULT FALSE,
    address_1 TEXT NOT NULL,
    postcode TEXT NOT NULL,
    city TEXT NOT NULL,
    attached_to TEXT,
    country_code TEXT NOT NULL,
    status TEXT,
    address_2 TEXT,
    phone_no TEXT,
    fax_no TEXT,
    misc TEXT
);
-- Down Migration
DROP TABLE admin.organisations;