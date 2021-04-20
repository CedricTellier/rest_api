const express = require('express');
const chai = require('chai');
const request = require('supertest');
const app = express();
describe('GET All users', () => {
    it('should get all created user inthe DB', () => {
        request(app)
        .get('employees/')
        .send({})
        .expect(201)
        .then((res) => {
        //  expect(res.headers.location).to.be.eql('123456/wallet');
         // more validations can be added here as required
        });
    });
});