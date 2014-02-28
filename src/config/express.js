var express = require('express'),
    config = require('./config'),
    path = require('path'),
    domain = require('domain'),
    serverDomain = domain.create(),
    domainError = require('express-domain-errors');

module.exports = function(app) {
  app.set('showStackError', true)

  function sendOfflineMsg() {
    if (process.send) { process.send('offline') }
  }

  serverDomain.run(function() {
    app.configure(function() {
      app.use(domainError(sendOfflineMsg))
      if (process.env.NODE_ENV != 'test') { app.use(express.logger(), 'dev') }
      app.use(express.bodyParser())
      app.use(express.methodOverride())
      app.use(express.favicon());

      app.use(app.router);

      // Assume 404 since no middleware responded
      app.use(function(req, res) {
        res.send(404);
      })

    })
  })
}