-- Up Migration
ALTER ROLE ALL
SET search_path = "$user";
-- Down Migration
AlTER ROLE ALL
SET search_path = "$user",
    public;