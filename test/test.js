const app = require("../server.js");
const request = require("supertest");
const expect = require("chai").expect;

describe('GET All users', function() {
    it("it should has status code 200", function(done) {
    request(app)
      .get("/employees/")
      .expect(200)
      .end(function(err, res){
        if (err) done(err);
        console.log(res.body);
        done();
      });
  });
});

describe('GET Caddev users', function() {
    it("GET /Caddev", function(done) {
    request(app)
      .get("/Caddev/employees/")
      .expect(200)
      .end(function(err, res){
        if (err) done(err);
        console.log(res.body);
        done();
      });
  });
});