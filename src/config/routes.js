module.exports = function(app, config) {
  var playbook = require('../controllers/playbook')
  app.get('/playbook', playbook.execute)
}