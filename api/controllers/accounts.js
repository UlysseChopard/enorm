exports.create = (req, res, next) => {
  res.send("create");
};

exports.getById = (req, res, next) => {
  res.send("get");
};

exports.getAll = (req, res, next) => {
  res.send("getAll");
};

exports.modify = (req, res, next) => {
  res.send("modify");
};

exports.remove = (req, res, next) => {
  res.send("remove");
};

exports.authenticate = (req, res, next) => {
  console.log(req.body.email);
  res.send("authenticate");
};
