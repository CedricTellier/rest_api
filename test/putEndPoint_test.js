const app = require("../server.js");
const mongoose = require('mongoose')
const request = require("supertest");
const expect = require("chai").expect;

describe('hooks', function() {  
    var employeesList = [];
    before(function(done) {
        mongoose.Promise = global.Promise;
        mongoose.set('useCreateIndex', true);
        mongoose.set('useUnifiedTopology', true);
        mongoose.set('useFindAndModify', false);
        mongoose.connect('mongodb+srv://caddev_user:o2kkHvBPppkyeW5z@caddev.w8pl8.mongodb.net/test', { useNewUrlParser: true }); 
        Employees = mongoose.model('Employees');
        Employees.find({ "firstname": { $regex: "Test*" } }, function(err, employee) {
            employeesList = employee;
            done();
        });
    });
    it("POST /employees/:id", function (done) {
        var i = employeesList.length;
        employeesList.forEach(modifiedEmployee => {
        var jsonEmployee = JSON.parse(modifiedEmployee);
        console.log(typeof(modifiedEmployee));
        var concatName = "Modified" + jsonEmployee.business;
        const modifyEmployee = {"firstname" : concatName, "lastname" : concatName};
        const modifyEndpoint = "/employees/" + jsonEmployee.id;
        console.log(modifyEndpoint);
        request(app)
            .put(modifyEndpoint)
            .send(modifyEmployee)
            .expect(200)
            .end(function (err, res) {
                if (err) done(err);
                // expect(res)
                // .to.have.nested.property('body')
                // .that.includes.all.keys([ 'url','id', 'firstname', 'lastname'
                i--;
                if(i == 0)
                    done();
            });
        });
    });
}); 
