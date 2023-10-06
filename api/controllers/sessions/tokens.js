const { getRandomValues } = require("crypto");
const { jwt } = require("utils");
const { Tokens } = require("models");

const setCookie = (res, token) =>
  res.cookie(jwt.key, token, {
    httpOnly: true,
    maxAge: jwt.maxAge,
    sameSite: process.env.NODE_ENV === "production" ? "None" : "Lax",
    secure: process.env.NODE_ENV === "production",
  });

exports.login = async (req, res, next) => {
  try {
    await Tokens.removeExpired();
    const {
      rows: [tokenFound],
    } = await Tokens.remove(req.params.id);
    if (!tokenFound) {
      return res.status(404).json({ message: "Token not found" });
    }
    const token = jwt.sign({ accountId: tokenFound.account });
    setCookie(res, token);
    res.status(201).json({ token });
  } catch (err) {
    next(err);
  }
};

exports.create = async (req, res, next) => {
  try {
    if (!req.body.account) {
      return res.status(422).json({ message: "Missing account in body" });
    }
    const id = getRandomValues(new UInt8Array(9)).reduce(
      (acc, val) => (acc += val)
    );
    const expiresAt = new Date();
    expiresAt.setMinutes(
      expiresAt.getMinutes() + process.env.TOKEN_EXPIRATION_DELAY
    );
    const {
      rows: [token],
    } = await Tokens.create({ account: req.body.account, id, expiresAt });
    res.status(401).json({ token });
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
