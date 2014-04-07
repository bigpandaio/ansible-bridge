var chai = require('chai')
    , chaiHttp = require('chai-http'),
    expect = require('chai').expect;

chai.use(chaiHttp);

describe('sending a request to ansible-bridge', function () {

    describe('sending a command request to ansible-bridge', function () {

        describe('sending a successful request to perform echo', function () {

            it('should result with status code 200', function (done) {
                chai.request('http://localhost:9999').get("/command/shell/localhost/echo%20'shush'")
                    .res(function (res) {
                        expect(res).to.have.status(200);
                        done();
                    });
            });
        });

        describe('sending a command request with a non-existing module', function () {

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

        describe('sending a successful request to run a playbook with no extra-vars', function () {

            it('should result with status code 200', function (done) {
                var path = process.cwd() + '/test/fixtures/echo_playbook';
                path = "/playbook/" + path.replace(/\//g, '%2F');

                chai.request('http://localhost:9999')
                    .get(path).res(function (res) {
                        expect(res).to.have.status(200);
                        done();
                    });
            });
        });

        describe('successful request to run a playbook that expects extra-vars', function () {

            it('should result with status code 200', function (done) {
                var path = process.cwd() + '/test/fixtures/echo_with_var_playbook';
                path = "/playbook/" + path.replace(/\//g, '%2F');

                chai.request('http://localhost:9999')
                    .post(path).req(function (req) {
                        req.send({extraVars: {name: 'shush'}})
                    }).res(function (res) {
                        expect(res).to.have.status(200);
                        done();
                    });
            });
        });

        describe('send request to run a playbook that expects extra-vars with no extra-vars', function () {

            it('should result with status code 400', function (done) {
                var path = process.cwd() + '/test/fixtures/echo_with_var_playbook';
                path = "/playbook/" + path.replace(/\//g, '%2F');

                chai.request('http://localhost:9999')
                    .post(path).req(function (req) {
                        req.send({extraVars: {}})
                    }).res(function (res) {
                        expect(res).to.have.status(400);
                        done();
                    });
            });
        });

    });
});