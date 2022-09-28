-- Up Migration
CREATE TYPE app_role AS ENUM ('manager', 'expert');
CREATE TABLE admin.users (
    id SERIAL PRIMARY KEY,
    email TEXT NOT NULL,
    password VARCHAR(97) NOT NULL,
    role APP_ROLE NOT NULL,
    UNIQUE(email, role)
);
ALTER TABLE admin.users OWNER TO admin;
-- Down Migration
DROP TABLE admin.users;
DROP TYPE app_role;