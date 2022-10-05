const log = require("../utils/logs");
const Users = require("../models/users");

exports.create = async (req, res) => {
  try {
    const { email, organisation } = req.body;
    let user;
    const {
      rows: [existingUser],
    } = await Users.getByEmail(email);
    if (!existingUser) {
      const {
        rows: [newUser],
      } = await Users.create({
        email,
        organisation,
        password: "",
      });
      user = newUser;
    } else {
      user = existingUser;
    }
    await Users.updateRole(user.id, { isExpert: true, isManager: false });
    await Users.updateOrganisation(user.id, organisation);
    res.sendStatus(201);
  } catch (err) {
    log.warn({ err });
    res.sendStatus(500);
  }
};
