const express = require("express");
const chai = require("chai");
const chaiHTTP = require("chai-http");
const sinon = require("sinon").createSandbox();
const middlewares = require("middlewares");
const accountsMiddlewares = require("middlewares/accounts");
const accountsControllers = require("controllers/accounts");

const expect = chai.expect;

chai.use(chaiHTTP);

const getApp = () => {
  delete require.cache[require.resolve("routes/accounts")];
  const accounts = require("routes/accounts");
  const app = express();
  app.use("/", accounts(express));
  return app;
};

afterEach(() => {
  sinon.restore();
});

describe("Test /accounts", () => {
  describe("Test GET /:id", () => {
    it("should return 404 when no account id", async () => {
      const app = getApp();
      const res = await chai.request(app).get("/");
      expect(res).to.have.status(404);
    });

    it("should return 403 when not account owner", async () => {
      const app = getApp();
      const res = await chai.request(app).get("/fake-id");
      expect(res).to.have.status(403);
    });

    it("should return 200 when authenticated as account owner", async () => {
      const isAccountOwnerStub = sinon
        .stub(accountsMiddlewares, "isAccountOwner")
        .callsFake((_req, _res, next) => next());
      const getStub = sinon
        .stub(accountsControllers, "get")
        .callsFake((_req, res) => res.sendStatus(200));
      const app = getApp();
      const res = await chai.request(app).get("/fake-id");
      sinon.assert.calledOnce(isAccountOwnerStub);
      sinon.assert.calledOnce(getStub);
      expect(res).to.have.status(200);
    });
  });
});
