exports.getUser = (req, res) => {
  res.json({ user: req?.user, session: req.session });
};
