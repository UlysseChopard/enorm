-- Up Migration
CREATE TABLE admin.organisations (
    name TEXT NOT NULL,
    short_name TEXT NOT NULL,
    is_consultant BOOLEAN NOT NULL DEFAULT FALSE,
    is_syndicate BOOLEAN NOT NULL DEFAULT FALSE,
    society_name TEXT NOT NULL,
    client_name TEXT,
    syndicate_no INTEGER DEFAULT 999,
    sector_act TEXT,
    status_part TEXT,
    person_in_charge TEXT,
    civil_name TEXT,
    civil_short_name TEXT,
    main_address TEXT NOT NULL,
    secondary_address TEXT,
    postcode TEXT NOT NULL,
    city TEXT NOT NULL,
    country TEXT NOT NULL,
    is_us_postcode BOOLEAN NOT NULL DEFAULT FALSE,
    phone_no TEXT,
    fax TEXT,
    website TEXT
);
ALTER TABLE admin.organisations OWNER TO admin;
-- Down Migration
DROP TABLE admin.organisations;