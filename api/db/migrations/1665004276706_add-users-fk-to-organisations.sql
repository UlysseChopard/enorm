-- Up Migration
ALTER TABLE admin.organisations
ADD COLUMN manager INTEGER REFERENCES admin.managers;
-- Down Migration
ALTER TABLE admin.organisations DROP COLUMN manager;