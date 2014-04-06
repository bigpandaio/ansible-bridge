var chai = require('chai')
    , chaiHttp = require('chai-http'),
    expect = require('chai').expect;

chai.use(chaiHttp);
require('../../index');

describe('sending a request to ansible-bridge', function () {

    describe('sending a command request to ansible-bridge', function () {

        describe('successful request to perform echo', function () {

            it('should result with status code 200', function (done) {
                chai.request('http://localhost:9999').get("/command/shell/localhost/echo%20'shush'")
                    .res(function (res) {
                        expect(res).to.have.status(200);
                        done();
                    });
            });
        });

        describe('request with a non-existing module', function () {

            it('should result with status code 400', function (done) {
                chai.request('http://localhost:9999')
                    .get("/command/bla/localhost/echo%20'shush'").res(function (res) {
                        expect(res).to.have.status(400);
                        done();
                    });
            });
        });
    });

    describe('sending a playbook request to ansible-bridge', function () {

        describe('request with a non-existing play book', function () {

            it('should result with status code 400', function (done) {
                chai.request('http://localhost:9999')
                    .get("/playbook/hello'").res(function (res) {
                        expect(res).to.have.status(400);
                        done();
                    });
            });
        });

        describe('successful request to run a playbook', function () {

            it('should result with status code 200', function (done) {
                var path = process.cwd() + '/test/fixtures';
                console.log(path);
                chai.request('http://localhost:9999')
                    .get("/playbook/%2FUsers%2Fshush%2Ftest_playbook").res(function (res) {
                        expect(res).to.have.status(200);
                        done();
                    });
            });
        });

    });
});