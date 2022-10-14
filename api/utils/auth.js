// https://www.passportjs.org/howtos/password/
const crypto = require("crypto");

exports.hash = (password) => {
  return new Promise((resolve, reject) => {
    // generate random 32 bytes long salt
    const salt = crypto.randomBytes(16).toString("hex");

    crypto.scrypt(password, salt, 32, (err, derivedKey) => {
      if (err) reject(err);
      resolve(salt + ":" + derivedKey.toString("hex"));
    });
  });
};

exports.verify = (password, hash) => {
  return new Promise((resolve, reject) => {
    const [salt, key] = hash.split(":");
    crypto.scrypt(password, salt, 32, (err, derivedKey) => {
      if (err) reject(err);
      resolve(crypto.timingSafeEqual(Buffer.from(key, "hex"), derivedKey));
    });
  });
};
