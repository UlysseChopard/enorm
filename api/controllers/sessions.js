const { crypt, jwt } = require("../utils");
const { Users } = require("../models");

const setCookie = (res, infos) => {
  const token = jwt.sign(infos);
  res.cookie(jwt.key, token, { httpOnly: true, maxAge: jwt.maxAge, secure: process.env.NODE === "production" });
};

exports.register = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const hash = await crypt.hash(password);
    const user = await Users.register({ email, password: hash });
    setCookie(res, { id: user.id });
    res.json({ email: user.email });
  } catch (err) {
    next(err);
  }
};

exports.login = async (req, res, next) => {
  try {
    const user = await Users.getByEmail(req.body.email);
    const isCorrectPassword = await crypt.compare(req.body.password, user.password);
    if (!isCorrectPassword) {
      res.sendStatus(401);
    } else {
      setCookie(res, { id: user.id});
      res.json({ email: user.email }); 
    }
  } catch (err) {
    next(err);
  }
};

exports.logout = (req, res) => {
  res.cookie(jwt.key, "", { maxAge: "1" });
  res.sendStatus(200);  
};
