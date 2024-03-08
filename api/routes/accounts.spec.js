const chai = require("chai");
const supertest = require("supertest");
const sinon = require("sinon").createSandbox();
const rewire = require("rewire");
const middlewares = require("middlewares");
const accountsMiddlewares = rewire("middlewares/accounts");
const app = require("app");

const expect = chai.expect;

const requireStubbed = (path, stubs = {}) => {
  if (require.cache[require.resolve(path)]) {
    delete require.cache[require.resolve(path)];
  }
  Object.entries(stubs).forEach(([stubPath, exports]) => {
    require.cache[require.resolve(stubPath)] = {
      exports,
    };
  });
  return require(path);
};

const neutralMiddleware = (_req, _res, next) => {
  console.log("NEUTRAL");
  next();
};

afterEach(() => {
  sinon.restore();
});

describe("Test /accounts", () => {
  describe("Test GET /:id", () => {
    it("should return 403 when not account owner", async () => {
      // middlewares.__set__("isAuthenticated", neutralMiddleware);
      sinon.stub(middlewares, "isAuthenticated");
      await supertest(app).get("/api/accounts/0").expect(403);
      // const res = await chai.request(app()).get("/api/accounts/0");
      // expect(res).to.have.status(403);
    });

    it.skip("should call get when account owner", async () => {
      sinon.stub(middlewares, "isAuthenticated").callsFake(neutralMiddleware);
      sinon
        .stub(accountsMiddlewares, "isAccountOwner")
        .callsFake(neutralMiddleware);
      const app = requireStubbed("app");
      const res = await chai.request(app()).get("/api/accounts/0");
      expect(res).to.have.status(204);
    });
  });
});
