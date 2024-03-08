const express = require("express");
const chai = require("chai");
const chaiHTTP = require("chai-http");
const sinon = require("sinon").createSandbox();
const middlewares = require("middlewares");
const accounts = require("routes/accounts");

const expect = chai.expect;

chai.use(chaiHTTP);

const getApp = (stubs = {}) => {
  delete require.cache[require.resolve("routes")];
  Object.entries(stubs).forEach(([path, exports]) => {
    require.cache[require.resolve(path)] = { exports };
  });
  const routes = require("routes");
  const app = express();
  return routes(express, app);
};

afterEach(() => {
  sinon.restore();
});

describe("Test routes root", () => {
  describe("Test admin routes", () => {
    it("should return 401 when unauthenticated", async () => {
      const app = getApp();
      const res = await chai.request(app).get("/api/admin");
      expect(res).to.have.status(401);
    });

    it("should return 403 when not superuser", async () => {
      const isAuthenticatedStub = sinon
        .stub(middlewares, "isAuthenticated")
        .callsFake((_req, _res, next) => next());
      const isSuperuserStub = sinon
        .stub(middlewares, "isSuperuser")
        .callsFake((_req, res) => res.sendStatus(403));
      const app = getApp();
      const res = await chai.request(app).get("/api/admin");
      expect(res).to.have.status(403);
      sinon.assert.calledOnce(isAuthenticatedStub);
      sinon.assert.calledOnce(isSuperuserStub);
    });

    it("should call admin router when authenticated as superuser", async () => {
      const isAuthenticatedStub = sinon
        .stub(middlewares, "isAuthenticated")
        .callsFake((_req, _res, next) => next());
      const isSuperuserStub = sinon
        .stub(middlewares, "isSuperuser")
        .callsFake((_req, _res, next) => next());
      const accountsStub = sinon.stub().callsFake(() => express.Router());
      const app = getApp({ "routes/accounts": accountsStub });
      await chai.request(app).get("/api/admin");
      sinon.assert.calledOnce(accountsStub);
    });
  });

  describe("Test sessions routes", () => {
    it("should return 401 when unauthenticated", async () => {
      const app = getApp();
      const res = await chai.request(app).get("/api/sessions");
      expect(res).to.have.status(401);
    });
  });

  describe("Test accounts routes", () => {
    it("should return 401 when unauthenticated", async () => {
      const app = getApp();
      const res = await chai.request(app).get("/api/accounts");
      expect(res).to.have.status(401);
    });
  });

  describe("Test organisations routes", () => {
    it("should return 404 without organisation id", async () => {
      const app = getApp();
      const res = await chai.request(app).get("/api/organisations");
      expect(res).to.have.status(404);
    });

    it("should return 401 when unauthenticated", async () => {
      const app = getApp();
      const res = await chai
        .request(app)
        .get("/api/organisations/fake-organisation");
      expect(res).to.have.status(401);
    });
  });
});
