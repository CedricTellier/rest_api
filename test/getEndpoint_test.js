const app = require("../server.js");
const request = require("supertest");
const expect = require("chai").expect;
const getDirs = [ '', '/Caddev', '/CadworkSA', '/Cadcom' , '/Cadskills', '/Capture4cad', '/Cadwork']
const endpointDir = '/employees';

getDirs.forEach(directory => {
  const endpoint = directory + endpointDir;
  const testDesc = "Test GET " + directory +  " employees"
  describe(testDesc, function () {
    const testName = "GET " + endpoint;
    it(testName, function (done) {
      request(app)
        .get(endpoint)
        .expect(200)
        .end(function (err, res) {
          if (err) done(err);
          done();
        });
    });
  });
});