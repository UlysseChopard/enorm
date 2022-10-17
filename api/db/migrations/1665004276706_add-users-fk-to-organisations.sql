-- Up Migration
ALTER TABLE organisations
ADD COLUMN manager INTEGER REFERENCES users;
-- Down Migration
ALTER TABLE organisations DROP COLUMN manager;