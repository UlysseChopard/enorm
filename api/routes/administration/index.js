const users = require("./users");
const establishments = require("./establishments");
const organisations = require("./organisations");

module.exports = (router) => {
  const adminRouter = router();
  adminRouter.use("/", organisations(router()));
  adminRouter.use("/users", users(router()));
  adminRouter.use("/establishments", establishments(router()));
  return adminRouter;
};
