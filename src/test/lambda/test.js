'use strict';
let chai = require('chai');
let expect = chai.expect;

let lambdaFuntion = require('../../main/lambda/function');


describe('consult user information by UserId ', function () {
    it('Check the returned for status code ', (done) => {
        lambdaFuntion.lambdaFuntion().then(function (result) {
            expect(result.statusCode).to.equal(200);
            done();
        })
    });
})
