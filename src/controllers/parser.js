var executor = require('./executor');

exports.parseCommand = function (req, res) {
    var module = req.params.module,
        hosts = req.params.hosts,
        args = req.params.args;

    var execResult = executor.executeCommand(module, hosts, args);

    parseResult(execResult, res);
};

exports.parsePlayBook = function (req, res) {

    var playbookName = req.params.name;
    var execResult = executor.executePlaybook(playbookName, req.body);

    parseResult(execResult, res);
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