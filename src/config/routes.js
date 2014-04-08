module.exports = function (app) {
    var parser = require('../controllers/parser');

    app.post('/playbook/:name*', parser.parsePlayBook);
    app.get('/playbook/:name*', parser.parsePlayBook);
    app.get('/command/:module/:hosts/:args', parser.parseCommand);
}