var chai = require("chai");
var chaiAsPromised = require("chai-as-promised");
var expect = require('chai').expect;

chai.use(chaiAsPromised);

var executor = require('../../src/controllers/executor');

describe('using executor to run ansible command or playbook', function () {

    describe('execute ansible command', function () {

        describe('using good arguments', function () {

            it('should resolved in result code 0', function (done) {
                var result = executor.executeCommand('shell', 'localhost', "echo 'shush'");

                return expect(result).eventually.have.property('code', 0).notify(done);
            });
        });

        describe('using a non-existing module', function () {

            it('should resolved in result code != 0', function (done) {
                var result = executor.executeCommand('bla', 'localhost', "echo 'shush'");

                return expect(result).eventually.have.property('code', 3).notify(done);
            });
        });

        describe('using undefined var as module', function () {

            it('should resolved in error', function (done) {
                var module = undefined;
                var result = executor.executeCommand(module, 'localhost', "echo 'shush'");

                return expect(result).be.rejected.notify(done);
            });
        });
    });

    describe('execute ansible playbook', function () {

        describe('running playbook with no extra-vars', function () {

            it('should resolved in result code 0', function (done) {
                var result = executor.executePlaybook(process.cwd() + '/test/fixtures/echo_playbook');

                return expect(result).eventually.have.property('code', 0).notify(done);
            });
        });

        describe('running playbook with extra-vars', function () {

            it('should resolved in result code 0', function (done) {
                var name = process.cwd() + '/test/fixtures/echo_with_var_playbook';
                var options = {extraVars: {name: 'shush'}};
                var result = executor.executePlaybook(name, options);

                return expect(result).eventually.have.property('code', 0).notify(done);
            });
        });

        describe('running playbook that expects extra-vars without', function () {

            it('should resolved in result code != 0', function (done) {
                var name = process.cwd() + '/test/fixtures/echo_with_var_playbook';
                var options = {};
                var result = executor.executePlaybook(name, options);

                return expect(result).eventually.have.property('code', 3).notify(done);
            });
        });

        describe('passing undefined var as playbook', function () {

            it('should resolved in error', function (done) {
                var name = undefined;
                var result = executor.executePlaybook(name);

                return expect(result).be.rejected.notify(done);
            });
        });

        describe('passing a non-existing playbook name', function () {

            it('should resolved with status code != 0', function (done) {
                var name = process.cwd() + '/test/fixtures/no_playbook';
                var result = executor.executePlaybook(name);

                return expect(result).eventually.have.property('code', 1).notify(done);
            });
        });
    });
});