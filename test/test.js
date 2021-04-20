const express = require('express');
const chai = require('chai');
const chaiHttp = require('chai-http');
const request = require('supertest');
const app = require("../server.js");
//const db = require('mongoose');
chai.use(chaiHttp);
describe('GET All users', () => {
    console.log('bite');
    it('should get all created user inthe DB', () => {
        console.log("in");
        request(app)
        .get('/employees/')
        .end((err, res) => {
            console.log(err); // outputs null
            console.log(res); // outputs normal-looking response
            //console.log(res.body) // {}
            // res.text.should.be.eql('test'); // passes test
            // done();
        }); 
        // .send({})
        // .expect(404)
        // .then((res) => {
        //     console.log('bite2');
        //     expect(res.headers.location).to.be.eql('employeeeeeeees/');
        //  // more validations can be added here as required
        // });
    });
});