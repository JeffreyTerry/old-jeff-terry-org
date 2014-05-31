var path = require('path'),
    fs = require('fs'),
    rootPath = path.normalize(__dirname + '/..'),
    env = process.env.NODE_ENV || 'development';

// Configuration for different environments
var config = {
  development: {
    root: rootPath,
    app: {
      name: 'AppName'
    },
    port: 3000,
    db: 'mongodb://localhost/AppName-development'
  },

  test: {
    root: rootPath,
    app: {
      name: 'AppName'
    },
    port: 3000,
    db: 'mongodb://localhost/AppName-test'
  },

  production: {
    root: rootPath,
    app: {
      name: 'AppName'
    },
    port: 3000,
    cred: {
        // Put the actual certificate path on your server. 
        /* 
        key: fs.readFileSync('/ssl/server/keys/server1.key'),
        cert: fs.readFileSync('/ssl/server/certificates/server1.crt'),
        ca: fs.readFileSync('/ssl/ca/ca.crt')
        */
    },
    db: 'mongodb://localhost/AppName-production'
  }
};

module.exports = config[env];

