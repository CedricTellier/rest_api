require('dotenv').config();
const app = require("../server.js");
const request = require("supertest");
const expect = require("chai").expect;
const getDirs = [ '', '/Caddev', '/CadworkSA', '/Cadcom' , '/Cadskills', '/Capture4cad', '/Cadwork']
const endpointDir = '/employees';
const companies = ['Caddev', 'CadworkSA', 'Cadcom' , 'Cadskills', 'Capture4cad', 'Cadwork'];
const mongoose = require("mongoose");

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

companies.forEach(company => {
  describe("Test " + company + " POST employee", function () {
    it("POST /employees/", function (done) {
    var concatName = "Test" + company;
    const newEmployee = {"firstname" : concatName, "lastname" : concatName, "business" : company};
    request(app)
        .post("/employees/")
        .send(newEmployee)
        .expect('Content-Type', /json/)
        .end(function (err, res) {
            if (err) done(err);
            expect(res)
                .to.have.nested.property('body')
                .that.includes.all.keys([ 'id', 'firstname', 'lastname', '_id' , 'created_date'])
            done();
        });
    });
  });  
});

companies.forEach(company => {
  describe("Test " + company + " PUT employee", function () {
      var employeesList = [];
      before(function(done) {
          mongoose.Promise = global.Promise;
          mongoose.set('useCreateIndex', true);
          mongoose.set('useUnifiedTopology', true);
          mongoose.set('useFindAndModify', false);
          mongoose.connect('mongodb+srv://api_user:4dC59S9Plp9W1nfl@personalcluster.uq0zj.mongodb.net/testing', { useNewUrlParser: true }); 
          Employees = mongoose.model('Employees');
          Employees.find({ "firstname": { $regex: "Test*" }, "lastname": { $regex: "Test*" }, "business": { $regex: company } }, function(err, employee) {
              employeesList = employee;
              done();
          });
      });
      it("PUT /employees/:id", function (done) {
          var concatName;
          var modifyEndpoint;
          var jsonObject = employeesList[0].toObject();
          for (var key in jsonObject) {
              if (key == "business") {
                  concatName = "Modified" + jsonObject[key];
              }
              else if (key == "_id") {
                  modifyEndpoint = "/employees/" + jsonObject[key];
              }
          }
          const modifyEmployee = {"firstname" : concatName, "lastname" : concatName};
          request(app)
              .put(modifyEndpoint)
              .send(modifyEmployee)
              .expect(200)
              .end(function (err, res) {
                  if (err) done(err);
                  done();
              });
          });
      });
});