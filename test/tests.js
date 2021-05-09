require('dotenv').config();
const app = require("../server.js");
const request = require("supertest");
const expect = require("chai").expect;
const companies = ['Caddev', 'CadworkSA', 'Cadcom' , 'Cadskills', 'Capture4cad', 'Cadwork'];

companies.forEach(company => {
    describe("Tests " + company, function () {
        var id;
        step("GET " + company, function (done) {
            request(app)
              .get("/" + company +  "/employees")
              .expect(200)
              .end(function (err, res) {
                if (err) done(err);
                done();
              });
          });
        step("POST " + company, function (done) {
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
                    id = res.body._id;
                    done();
                });
        });
        step("PUT " + company, function (done) {
            var concatName = "Modified" + company;
            const modifyEmployee = {"firstname" : concatName, "lastname" : concatName};
            request(app)
                .put("/employees/" + id)
                .send(modifyEmployee)
                .expect(200)
                .end(function (err, res) {
                    if (err) done(err);
                    done();
                });
        });
        step("DELETE " + company, function (done) {
            request(app)
                .delete("/employees/" + id)
                .expect(200)
                .end(function (err, res) {
                    if (err) done(err);
                    expect(res)
                    .to.have.nested.property('body')
                    .that.includes.all.keys([ 'message'])
                    done();
                });
            });
    });
});