exports.sendResetLink = (email, link) => Email.send({ email, body: link });
