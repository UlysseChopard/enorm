const chai = require("chai");
const chaiHTTP = require("chai-http");
const expect = chai.expect;
const app = require("app");

chai.use(chaiHTTP);

describe("Test /accounts", () => {
  describe("Test GET /:id", () => {
    it("should return 401 when not authenticated", async () => {
      const res = await chai.request(app).get("/api/accounts/0");
      console.log(res);
      expect(res).to.have.status(401);
    });
  });
});
