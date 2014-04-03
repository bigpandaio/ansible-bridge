module.exports = function(app, config) {
  var execute = require('../controllers/execute')(config.inventory);

  app.get('/playbook/:name*', execute.executePlaybook);
  app.get('/command/:module/:hosts/:args', execute.executeCommand);
}