var express = require('express')
  , passport = require('passport')
  , session = require('../app/controllers/session');

// Configuration for express server
module.exports = function(app, config) {
  app.configure(function () {
    app.use(express.compress());
    app.use(express.static(config.root + '/public'));
    app.set('port', config.port);
    app.set('views', config.root + '/app/views');
    //Using jade templating
    app.set('view engine', 'jade'); 
    app.use(express.favicon(config.root + '/public/imgs/favicon.ico'));
    app.use(express.logger('dev'));
    app.use(express.bodyParser());
    app.use(express.methodOverride());
    app.use(express.cookieParser());
    app.use(express.session({ secret: 'CHANGE THIS SECRET! USE NODE.EVN' })); 
    //CSRF validation for non API routs and Oath validation for API calls
    app.use(session.validateRequest);
    app.use(passport.initialize());
    app.use(passport.session());
    app.use(app.router);
    app.use(function(req, res) {
      res.status(404).render('404', { title: '404' });
    });
  });
};

