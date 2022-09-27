-- -- Up Migration
DROP ROLE IF EXISTS admin;
CREATE USER admin WITH PASSWORD 'Admin123@';
GRANT ALL PRIVILEGES ON DATABASE postgres TO admin;
-- Down Migration
DROP USER admin;