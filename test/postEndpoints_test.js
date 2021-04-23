const app = require("../server.js");
const request = require("supertest");
const expect = require("chai").expect;
const companies = ['Caddev', 'CadworkSA', 'Cadcom' , 'Cadskills', 'Capture4cad', 'Cadwork'];
var employeeList = [];

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
                employeeList.push(res.body);
                done();
            });
        });
    });
});

