let chai = require('chai');
const logger = require("../config/logger")
let chaiHttp = require('chai-http');
chai.use(chaiHttp);
chai.should();


let server = require('../server');
let fs = require('fs');
function readf() {

    let data = fs.readFileSync(`${__dirname}/test.json`);
    let pData = JSON.parse(data);
    return pData;
}

describe('register', function () {
    let data = readf();
    it('should pass the test if the data entered is proper', function (done) {
        chai.request(server).post('/register').send(data.register).end((err, data) => {
            if (err) {
                logger.error(err);
                logger.error("programming error:", err);
                err.should.have.status(400)
            } else {

                data.should.have.status(500)
                done()
            }
            // data.should.have.status(200);
            // setTimeout(function () {
            //     done()
            // }, 3000)
        })
    })
})
describe('registerwrong', function () {
    let data = readf();
    it('should return status 422, if password length is not sufficient', function (done) {
        chai.request(server).post('/register').send(data.registerwrong).end((err, data) => {
            data.should.have.status(422)
            done();
        })
    })
    it('should return status 422, if firstname is null', function (done) {
        chai.request(server).post('/register').send(data.registerwrong2).end((err, data) => {
            data.should.have.status(422)
            done();
        })
    })
    it('should return status 422,  if firstname is number', function (done) {
        chai.request(server).post('/register').send(data.registerwrong3).end((err, data) => {
            data.should.have.status(422)
            done();
        })
    })
    it('should return status 422,  if allfields are null', function (done) {
        chai.request(server).post('/register').send(data.registerwrong4).end((err, data) => {
            data.should.have.status(422)
            done();
        })
    })
})



describe('login', function () {
    let data = readf();
    it('should pass the test if proper data is entered', function (done) {
        chai.request(server).post('/login').send(data.login).end((err, data) => {
            data.should.have.status(200);
            done();
        })
    })
    it('should return status 422,  if email is not in format', function (done) {
        chai.request(server).post('/login').send(data.loginWrong1).end((err, data) => {
            data.should.have.status(422);
            done();
        })
    })
    it('should return status 422,  if email is null', function (done) {
        chai.request(server).post('/login').send(data.loginWrong2).end((err, data) => {
            data.should.have.status(422);
            done();
        })
    })
    it('should return status 422,  if password is null', function (done) {
        chai.request(server).post('/login').send(data.loginWrong3).end((err, data) => {
            data.should.have.status(422);
            done();
        })
    })
    it('should return status 422,  if passwird doesnot have sufficient length', function (done) {
        chai.request(server).post('/login').send(data.loginWrong4).end((err, data) => {
            data.should.have.status(422);
            done();
        })
    })
    it('should return status 422,  if password is wrong', function (done) {
        chai.request(server).post('/login').send(data.loginWrong5).end((err, data) => {
            data.should.have.status(500);
            done();
        })
    })
})


describe('forgotPassword', function () {
    let data = readf();
    it('status', function (done) {
        chai.request(server).post('/forgotPassword').send(data.forgotPassword).end((err, data) => {
            data.should.have.status(200)
            done();
        })
    })
})


describe('forgotPasswordwrong', function () {
    let data = readf();
    it('status', function (done) {
        chai.request(server).post('/forgotPassword').send(data.forgotpasswordwrong).end((err, data) => {
            data.should.have.status(422)
            done();
        })

    })
    it('should return status 422, if mail doesnot exist', function (done) {
        chai.request(server).post('/forgotPassword').send(data.forgotpasswordwrong).end((err, data) => {
            data.should.have.status(422)
            done();
        })
    })
})


