const { db } = require("utils");

exports.create = (subscription, manager) =>
  db.query(
    "INSERT INTO subscriptions_managers (subscription, manager) VALUES ($1, $2) RETURNING *",
    [subscription, manager]
  );

exports.remove = (id) =>
  db.query("DELETE FROM subscriptions_managers WHERE id = $1", [id]);

exports.getBySubscription = (subscription) =>
  db.query(
    "SELECT sm.id, sm.manager, om.account, a.firstname, a.lastname FROM subscriptions_managers AS sm JOIN organisations_members AS om ON sm.manager = om.id JOIN accounts AS a ON om.account = a.id WHERE sm.subscription = $1",
    [subscription]
  );
