const chai = require("chai");
const chaiHTTP = require("chai-http");
const expect = chai.expect;
const app = require("app");

chai.use(chaiHTTP);

describe("Test /accounts", () => {
  describe("Test GET /", () => {
    it("should return 401 when not logged in", async () => {
      const res = await chai.request(app).get("/accounts");
      expect(res).to.have.status(401);
    });
  });
});
