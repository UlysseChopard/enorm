const { crypt, jwt, mail } = require("../utils");
const { Accounts } = require("../models");
const { BASE_URL } = process.env;

exports.login = async (req, res, next) => {
  try {
    const {
      rows: [account],
    } = await Accounts.getByEmail(req.body.email);
    if (!account) return res.sendStatus(401);
    if (!crypt.encrypt(req.body.password) === account.hash)
      return res.sendStatus(401);
    const token = jwt.sign({ accountId: account.id });
    res.cookie(jwt.key, token, {
      httpOnly: true,
      maxAge: jwt.maxAge,
      sameSite: process.env.NODE_ENV === "production" ? "None" : "Lax",
      secure: process.env.NODE_ENV === "production",
    });
    res.status(201).json({ token, account: account.id });
  } catch (err) {
    next(err);
  }
};

exports.loginWithoutPasswd = (_req, res) => {
  if (!res.locals.accountId) return res.sendStatus(401);
  const token = jwt.sign({ accountId: res.locals.accountId });
  res.cookie(jwt.key, token, {
    httpOnly: true,
    maxAge: jwt.maxAge,
    sameSite: process.env.NODE_ENV === "production" ? "None" : "Lax",
    secure: process.env.NODE_ENV === "production",
  });
  res.sendStatus(204);
};

exports.logout = async (req, res) => {
  res.cookie(jwt.key, "", { maxAge: "1" });
  res.json({ message: "logged out" });
};

exports.getStatus = (_req, res) =>
  res.locals.accountId
    ? res.json({ status: "authenticated" })
    : res.status(401).json({ status: "unauthenticated" });

exports.sendMailAccess = async (req, res, next) => {
  if (!req.body.email)
    return res.status(400).json({ message: "Missing email property" });
  try {
    const {
      rows: [account],
    } = await Accounts.getByEmail(req.body.email);
    if (!account) return res.sendStatus(401);
    const token = jwt.sign(
      { accountId: account.id },
      process.env.JWT_RESET_PASSWD_MAX_AGE
    );
    const resetLink = `${BASE_URL}/access/${encodeURIComponent(
      token
    ).replaceAll(".", "/")}`;
    const subject = "Connect to Enorm without password";
    const header = "Hi";
    const body = `Please click on the link after to connect to Enorm without a password: ${resetLink}`;
    await mail.send({
      recipient: account.email,
      subject,
      text: `${header}\n\n${body}`,
    });
    res.sendStatus(204);
  } catch (err) {
    next(err);
  }
};
