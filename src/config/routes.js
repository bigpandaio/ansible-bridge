module.exports = function(app, config) {
  var execute = require('../controllers/parser')();

  app.post('/playbook/:name*', execute.parsePlaybook);
  app.get('/playbook/:name*', execute.parsePlaybook);
  app.get('/command/:module/:hosts/:args', execute.parseCommand);
}