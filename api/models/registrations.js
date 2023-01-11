const { db } = require("../utils");

exports.getByUserId = uuid => db.query("SELECT * FROM registrations WHERE user_id = $1", [uuid]);
