const { crypt } = require("utils");
const { Tokens } = require("models");

exports.upsert = async (req, res, next) => {
  try {
    if (!req.body.organisationMember) {
      return res
        .status(422)
        .json({ message: "Missing organisation member in body" });
    }
    let id;
    while (true) {
      id = crypt.getIntToken(parseInt(process.env.TOKEN_LENGTH, 10));
      const {
        rows: [token],
      } = await Tokens.get(id);
      if (!token) break;
    }
    const expiresAt = new Date();
    expiresAt.setMinutes(
      expiresAt.getMinutes() + parseInt(process.env.TOKEN_EXPIRATION_DELAY, 10)
    );
    const {
      rows: [prevToken],
    } = await Tokens.getByOrganisationMember(req.body.organisationMember);
    if (prevToken) {
      await Tokens.remove(prevToken.id);
    }
    const {
      rows: [token],
    } = await Tokens.create({
      organisationMember: req.body.organisationMember,
      id,
      expiresAt,
    });
    res.status(201).json({ token });
  } catch (err) {
    next(err);
  }
};

exports.remove = async (req, res, next) => {
  try {
    const {
      rows: [token],
    } = await Tokens.remove(req.params.id);
    if (!token) {
      return res.status(404).json({ message: "Token not found" });
    }
    res.json({ token });
  } catch (err) {
    next(err);
  }
};
