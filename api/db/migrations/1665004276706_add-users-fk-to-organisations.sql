-- Up Migration
ALTER TABLE admin.organisations
ADD COLUMN manager INTEGER REFERENCES admin.users;
-- Down Migration
ALTER TABLE admin.organisations DROP COLUMN manager;