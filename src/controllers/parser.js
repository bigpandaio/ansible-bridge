var executer = require('./executer');

module.exports = function () {

    return {
        parsePlaybook: function (req, res) {
            var playbookName = req.params.name;

            var vars = {};

            if (req.body && req.body.extraVars) {
                vars = req.body.extraVars;
            }

            var execResult = executer.executePlaybook(playbookName, vars);

            parseResult(execResult, res);
        },

        parseCommand: function (req, res) {
            var module = req.params.module,
                hosts = req.params.hosts,
                args = req.params.args;

            var execResult = executer.executeCommand(module, hosts, args);

            parseResult(execResult, res);
        }
    }
};

function parseResult(execResult, res) {
    execResult.then(function (successResult) {

        if (successResult.code != 0) {
            res.send(400, successResult.output);
            return;
        }
        res.send(successResult.output);

    }, function (error) {
        res.send(400, error);
    })
}