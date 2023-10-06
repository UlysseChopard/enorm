const { crypt, jwt, mail } = require("utils");
const { Accounts } = require("models");
const { BASE_URL, NODE_ENV, JWT_RESET_PASSWD_MAX_AGE } = process.env;

const setCookie = (res, token) =>
  res.cookie(jwt.key, token, {
    httpOnly: true,
    maxAge: jwt.maxAge,
    sameSite: NODE_ENV === "production" ? "None" : "Lax",
    secure: NODE_ENV === "production",
  });

exports.login = async (req, res, next) => {
  try {
    const {
      rows: [account],
    } = await Accounts.getByEmail(req.body.email);
    if (!account) return res.sendStatus(401);
    if (!crypt.encrypt(req.body.password) === account.hash) {
      return res.sendStatus(401);
    }
    const token = jwt.sign({ accountId: account.id });
    setCookie(res, token);
    res.status(201).json({ session: { token, account: account.id } });
  } catch (err) {
    next(err);
  }
};

exports.loginWithoutPasswd = (_req, res) => {
  if (!res.locals.accountId) return res.sendStatus(401);
  const token = jwt.sign({ accountId: res.locals.accountId });
  setCookie(res, token);
  res.status(201).json({ session: token });
};

exports.logout = async (req, res) => {
  res.cookie(jwt.key, "", { maxAge: "1" });
  res.json({ session: null });
};

exports.getStatus = (req, res) =>
  res.locals.accountId
    ? res.json({
        session: req.body[jwt.key] || req.headers.authorization?.split(" ")[1],
      })
    : res.status(401).json({ message: "Not authenticated" });

exports.sendMailAccess = async (req, res, next) => {
  try {
    if (!req.body.email) {
      return res.status(400).json({ message: "Missing email property" });
    }
    const {
      rows: [account],
    } = await Accounts.getByEmail(req.body.email);
    if (!account) return res.sendStatus(401);
    const token = jwt.sign({ accountId: account.id }, JWT_RESET_PASSWD_MAX_AGE);
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
