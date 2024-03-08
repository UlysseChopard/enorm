const express = require("express");
const chai = require("chai");
const sinon = require("sinon").createSandbox();
const { test } = require("utils");
const middlewares = require("middlewares");
const accounts = require("routes/accounts");

const expect = chai.expect;

const getApp = test.getApp("routes");

describe("Routes: index", () => {
  afterEach(() => {
    sinon.restore();
  });

  describe("Admin", () => {
    it("should return 401 when unauthenticated", async () => {
      const app = getApp();
      const res = await chai.request(app).get("/api/admin");
      expect(res).to.have.status(401);
    });

    it("should return 403 when not superuser", async () => {
      const isAuthenticatedStub = sinon
        .stub(middlewares, "isAuthenticated")
        .callsFake(test.neutralMiddleware());
      const isSuperuserStub = sinon
        .stub(middlewares, "isSuperuser")
        .callsFake(test.neutralResponse(403));
      const app = getApp();
      const res = await chai.request(app).get("/api/admin");
      expect(res).to.have.status(403);
      expect(isAuthenticatedStub).to.have.been.calledOnce;
      expect(isSuperuserStub).to.have.been.calledOnce;
    });

    it("should call admin router when authenticated as superuser", async () => {
      const isAuthenticatedStub = sinon
        .stub(middlewares, "isAuthenticated")
        .callsFake(test.neutralMiddleware());
      const isSuperuserStub = sinon
        .stub(middlewares, "isSuperuser")
        .callsFake(test.neutralMiddleware());
      const accountsStub = sinon.stub().callsFake(() => express.Router());
      const app = getApp({ "routes/accounts": accountsStub });
      await chai.request(app).get("/api/admin");
      expect(accountsStub).to.have.been.calledOnce;
    });
  });

  describe("Sessions", () => {
    it("should return 401 when unauthenticated", async () => {
      const app = getApp();
      const res = await chai.request(app).get("/api/sessions");
      expect(res).to.have.status(401);
    });
  });

  describe("Accounts", () => {
    it("should return 401 when unauthenticated", async () => {
      const app = getApp();
      const res = await chai.request(app).get("/api/accounts");
      expect(res).to.have.status(401);
    });
  });

  describe("Organisations", () => {
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
