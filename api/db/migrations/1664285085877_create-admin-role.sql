-- -- Up Migration
CREATE USER admin;
GRANT ALL PRIVILEGES ON DATABASE postgres TO admin;
-- Down Migration
REASSIGN OWNED BY admin TO postgres;
DROP OWNED BY admin;
DROP USER admin;