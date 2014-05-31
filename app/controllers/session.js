var passport = require('passport')
  , LocalStrategy = require('passport-local').Strategy
  , db = require('../models/users')
  , express = require("express")
  , csrf = require('csurf');


// POST /login
//   This is an alternative implementation that uses a custom callback to
//   achieve the same functionality.
exports.login = function(req, res, next) {
	console.log(req.body);
	if ( req.body.rememberme ) {
		req.session.cookie.maxAge = 2592000000; // Remember me for 30 days
	} else {
		req.session.cookie.expires = false;
	}

  passport.authenticate('local', function(err, user, info) {
    if (err) { return next(err) }
    if (!user) {
      req.session.messages =  [info.message];
      console.log('Failed login');
      return res.status(400).json({status:'Failed', message:info.message});
    }
    req.logIn(user, function(err) {
      if (err) { return next(err); }
      console.log('Login Success');
      return res.status(202).json({status:'Success'});
    });
  })(req, res, next);
};

exports.logout = function(req, res) {
  req.logout();
  res.redirect('/');
};


exports.validateRequest = function (req, res, next) {
    if ( req.url == '/API/*') {
    	return next();   //Some other way of validation
    } else {
    	csrf()(req,res,next);
    }
};

passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  db.userModel.findById(id, function (err, user) {
    done(err, user);
  });
});

passport.use(new LocalStrategy({usernameField: 'email'}, function(email, password, done) {
  db.userModel.findOne({ email: email }, function(err, user) {
    if (err) { return done(err); }
    if (!user) { return done(null, false, { message: 'Unknown user ' + email }); }
    user.comparePassword(password, function(err, isMatch) {
      if (err) return done(err);
      if(isMatch) {
        return done(null, user);
      } else {
        return done(null, false, { message: 'Invalid password' });
      }
    });
  });
}));

// Simple route middleware to ensure user is authenticated.  Otherwise send to login page.
exports.ensureAuthenticated = function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) { return next(); }
  res.redirect('/login')
}

