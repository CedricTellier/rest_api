const app = require("../server.js");
const request = require("supertest");
const expect = require("chai").expect;

describe("Test for all employees Get endpoints", function () {
  it("GET /employees/", function (done) {
    request(app)
      .get("/employees/")
      .expect(200)
      .end(function (err, res) {
        if (err) done(err);
        done();
      });
  });
});

describe("Test for Caddev Get endpoints", function () {
  it("GET /Caddev", function (done) {
    request(app)
      .get("/Caddev/employees/")
      .expect(200)
      .end(function (err, res) {
        if (err) done(err);
        done();
      });
  });
});

describe("Test for CadworkSA Get endpoint", function () {
  it("GET /CadworkSA", function (done) {
    request(app)
      .get("/CadworkSA/employees/")
      .expect(200)
      .end(function (err, res) {
        if (err) done(err);
        done();
      });
  });
});

describe("Test for Cadcom Get endpoint", function () {
  it("GET /Cadcom", function (done) {
    request(app)
      .get("/Cadcom/employees/")
      .expect(200)
      .end(function (err, res) {
        if (err) done(err);
        done();
      });
  });
});

describe("Test for Cadwork Get endpoint", function () {
  it("GET /Cadwork", function (done) {
    request(app)
      .get("/Cadwork/employees/")
      .expect(200)
      .end(function (err, res) {
        if (err) done(err);
        done();
      });
  });
});

describe("Test Cadskill Get endpoint", function () {
  it("GET /Cadskills", function (done) {
    request(app)
      .get("/Cadskills/employees/")
      .expect(200)
      .end(function (err, res) {
        if (err) done(err);
        done();
      });
  });
});
