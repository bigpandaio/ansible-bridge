var Ansible = require('node-ansible');
var inventory = require('../config/config').inventory;

exports.executeCommand = function (module, hosts, args) {
    var command = new Ansible.AdHoc().module(module).hosts(hosts).args(args)
        .inventory(inventory);

    return command.exec();
};

exports.executePlaybook = function (playbookName, options) {
    var playbook = new Ansible.Playbook().playbook(playbookName).inventory(inventory);

    if (options) {

        // here should add optional flags handling

        if (options.extraVars && Object.keys(options.extraVars).length != 0) {
            playbook.variables(options.extraVars);
        }
    }

    return playbook.exec();
};