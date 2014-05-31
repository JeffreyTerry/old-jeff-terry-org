var config = require('./config/config')
  , express = require('express')
  , mongoose = require('mongoose')
  , socketIO = require('socket.io')
  , http = require('http')
  , https = require('https')
  , fs = require('fs');
  

// Mongodb connection 
mongoose.connect(config.db);
var db = mongoose.connection;
db.on('error', function () {
  throw new Error('unable to connect to database at ' + config.db);
});


// Reads all the model files form /app/models
var modelsPath = __dirname + '/app/models';
fs.readdirSync(modelsPath).forEach(function (file) {
  if (file.indexOf('.js') >= 0) {
    require(modelsPath + '/' + file);
  }
});

// Creating the app, https server and socket server. HTTPS only runs for production
if (process.env.NODE_ENV == 'production') {
  var app = express()
    , server = https.createServer(config.cred, app)
  	, io = socketIO.listen(server);
} else {
  var app = express()
    , server = http.createServer(app)
    , io = socketIO.listen(server);
}


// Configuring sockets, app and routes
require('./config/socket')(io);
require('./config/express')(app, config);
require('./config/routes')(app, io);


server.listen(config.port);
console.log('Express server is listening on port %s on %s environment.', config.port, app.settings.env);
