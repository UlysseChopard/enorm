const log = require("../utils/logs");
const Users = require("../models/users");

exports.getUser = (req, res) => {
  res.json({ user: req.user });
};

exports.create = async (req, res) => {
  try {
    const { email, organisation, roles = [] } = req.body;
    let user;
    const {
      rows: [existingUser],
    } = await Users.getByEmail(email);
    if (!existingUser) {
      const {
        rows: [newUser],
      } = await Users.create({
        email,
        password,
      });
      user = newUser;
    } else {
      user = existingUser;
    }
    await Users.updateRole(user.id, {
      isExpert: roles.includes("expert"),
      isManager: roles.includes("manager"),
    });
    await Users.updateOrganisation(user.id, organisation);
    res.sendStatus(201);
  } catch (err) {
    log.warn({ err });
    res.sendStatus(500);
  }
};
