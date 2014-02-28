var express = require('express'),
    fs = require('fs')

var env = process.env.NODE_ENV = process.env.NODE_ENV || 'development'

var config = require('./config/config')

var app = express()

// Setup express
require('./config/express')(app)

// Setup routs
require('./config/routes')(app, config)

// Start the app by listening on <port>
var port = process.env.PORT || config.port;
app.listen(port, function() {
  console.log("Ansible bridge started on port " + port)
  if (process.send) { process.send('online') }
})


exports = module.exports = app;
