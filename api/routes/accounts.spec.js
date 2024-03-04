const chai = require("chai");
const chaiHTTP = require("chai-http");
const sinon = require("sinon").createSandbox();
const rewire = require("rewire");
// const accountsController = require("controllers/accounts");

const app = rewire("app");
const routes = rewire("routes");
const accountsRoutes = rewire("routes/accounts");

const expect = chai.expect;

chai.use(chaiHTTP);

const requireStubbed = (path, stubs) => {
  if (require.cache[require.resolve(path)]) {
    delete require.cache[require.resolve(path)];
  }
  Object.entries(stubs).forEach(([stubPath, stub]) => {
    require.cache[require.resolve(stubPath)] = {
      exports: stub,
    };
  });
  return require(path);
};

const middlewareStub = sinon.stub().callsFake((_req, _res, next) => next());

afterEach(() => {
  sinon.restore();
});

describe("Test /accounts", () => {
  describe("Test GET /:id", () => {
    it("should return 401 when not authenticated", async () => {
      const res = await chai.request(app).get("/api/accounts/0");
      expect(res).to.have.status(401);
    });

    const restoreRoutes = routes.__set__("isAuthenticated", middlewareStub);

    it("should return 403 when not account owner", async () => {
      const app = requireStubbed("app", { routes });
      const res = await chai.request(app).get("/api/accounts/0");
      expect(res).to.have.status(403);
    });

    const restoreAccountsRoutes = accountsRoutes.__set__(
      "isAccountOwner",
      middlewareStub,
    );

    it("should call get when account owner", async () => {
      const restore = accountsRoutes.__set__("get", (_req, res, _next) =>
        res.sendStatus(204),
      );
      const app = requireStubbed("app", {
        routes,
        "routes/accounts": accountsRoutes,
      });
      const res = await chai.request(app).get("/api/accounts/0");
      console.log(res.body);
      expect(res).to.have.status(204);
      restore();
    });
  });
});
