var config = require('./config/config')
  , express = require('express')
  , mongoose = require('mongoose')
  , http = require('http')
  , fs = require('fs');
  

// Open the MongoDB connection 
mongoose.connect(config.db);
var db = mongoose.connection;
db.on('error', function () {
  throw new Error('Unable to connect to the database at ' + config.db);
});


// Reads all the model files form /app/models
var modelsPath = __dirname + '/app/models';
fs.readdirSync(modelsPath).forEach(function (file) {
  if (file.indexOf('.js') >= 0) {
    require(modelsPath + '/' + file);
  }
});


// Configures app and routes
var app = express();
require('./config/express')(app, config);
require('./config/routes')(app);

// Starts the server
http.createServer(app).listen(config.port);
console.log('Express server is listening on port %s on %s environment.', config.port, app.settings.env);
