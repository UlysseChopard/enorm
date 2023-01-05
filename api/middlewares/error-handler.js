module.exports = (err, req, res, next) => {
  req.log.error({ err });
  if (res.headersSent) return next(err);
  res.status(500).text("Internal server error");
};
