const app = require("../server.js");
const mongoose = require('mongoose')
const request = require("supertest");
const expect = require("chai").expect;
const companies = ['Caddev', 'CadworkSA', 'Cadcom' , 'Cadskills', 'Capture4cad', 'Cadwork'];

companies.forEach(company => {
    describe("Test " + company + " PUT employee", function () {
        var employeesList = [];
        before(function(done) {
            mongoose.Promise = global.Promise;
            mongoose.set('useCreateIndex', true);
            mongoose.set('useUnifiedTopology', true);
            mongoose.set('useFindAndModify', false);
            mongoose.connect('mongodb+srv://caddev_user:o2kkHvBPppkyeW5z@caddev.w8pl8.mongodb.net/test', { useNewUrlParser: true }); 
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

