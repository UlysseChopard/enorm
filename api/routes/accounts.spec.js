const chai = require("chai");
const chaiHTTP = require("chai-http");
const sinon = require("sinon");
const rewire = require("rewire");
const accountsController = require("controllers/accounts");

const routes = rewire("routes");
const accountsRouter = rewire("routes/accounts");

const expect = chai.expect;

const replaceModule = (path, newModule) => {
  require.cache[require.resolve(path)] = { exports: newModule };
};

const passAuthentication = () => {
  const resetRoutes = routes.__set__("isAuthenticated", (_req, _res, next) =>
    next(),
  );
  replaceModule("routes", routes);
  return resetRoutes;
};

const isAccountOwner = () => {
  const resetAccountsRouter = accountsRouter.__set__(
    "isAccountOwner",
    (_req, _res, next) => next(),
  );
  replaceModule("routes/accounts", accountsRouter);
  return resetAccountsRouter;
};

chai.use(chaiHTTP);

describe("Test /accounts", () => {
  describe("Test GET /:id", () => {
    beforeEach(() => {
      delete require.cache[require.resolve("app")];
    });

    it("should return 401 when not authenticated", async () => {
      const app = require("app");
      const res = await chai.request(app).get("/api/accounts/0");
      expect(res).to.have.status(401);
    });

    it("should return 403 when not account owner", async () => {
      const resetRoutes = passAuthentication();
      const app = require("app");
      const res = await chai.request(app).get("/api/accounts/0");
      expect(res).to.have.status(403);
      resetRoutes();
    });

    it("should call get when account owner", async () => {
      const resetRoutes = passAuthentication();
      const resetAccountsRouter = isAccountOwner();
      replaceModule("controllers/accounts", {
        ...accountsController,
        get: (_req, res) => res.sendStatus(204),
      });
      const app = require("app");
      const res = await chai.request(app).get("/api/accounts/0");
      expect(res).to.have.status(204);
      resetAccountsRouter();
      resetRoutes();
    });
  });
});
