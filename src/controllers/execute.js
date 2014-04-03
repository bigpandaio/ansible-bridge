
var Ansible = require('node-ansible');

var inventory;

module.exports.executePlaybook = function(req, res) {
    var playbook = new Ansible.Playbook().playbook(req.params.name).inventory(inventory);
    execute(playbook, res);
}

module.exports.executeCommand = function(req, res) {
    var command = new Ansible.AdHoc().module(req.params.module).hosts(req.params.hosts).args(req.params.args)
        .inventory(inventory);
    execute(command, res);
}

function execute(exec, res) {
    exec.exec().then(function (successResult) {

        if (successResult.code != 0) {
            res.status(400).send(successResult.output);
            return;
        }
        res.send(successResult.output);

    }, function (error) {
        res.status(400);
        res.send(error);
    })
}

module.exports.setInventory = function(newInventory) {
    inventory = newInventory;
}