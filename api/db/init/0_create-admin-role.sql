-- -- Up Migration
CREATE USER admin WITH CREATEDB;
-- Down Migration
REASSIGN OWNED BY admin TO postgres;
DROP OWNED BY admin;
DROP USER admin;