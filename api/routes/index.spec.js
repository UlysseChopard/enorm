const chai = require("chai");
const supertest = require("supertest");
const app = require("app");

const expect = chai.expect;

describe("Test root", () => {
  describe("Test admin routes", () => {
    it("should return 401 when unauthenticated", async () => {
      await supertest(app).get("/api/admin").expect(401);
    });
  });
});
