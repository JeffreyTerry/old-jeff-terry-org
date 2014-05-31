var passport = require('passport')
  , LocalStrategy = require('passport-local').Strategy
  , _ = require('underscore')
  , user = require('../app/controllers/users')
  , session = require('../app/controllers/session');

// Stores a dictionary with route paths as keys and their corresponding static html files as values.
var URLToStaticFileMap = {
  '/': 'home/home'
};


var renderStaticPage = function(req, res){
  res.render(URLToStaticFileMap[req.route.path], {
      title: 'AppName',
      csrfToken: req.csrfToken()
  });
};


module.exports = function(app, io){
/* API Routes */

/* User Routes */
  // Static Pages
  _.each(URLToStaticFileMap, function(value, key){
    app.get(key ,renderStaticPage);
  });



  // Other Routes

  /* Login Routes */
  app.post('/login' , session.login);
  app.get( '/logout', session.logout);
};
