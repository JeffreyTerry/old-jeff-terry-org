var express = require('express'),
    compression = require('compression'),
    bodyParser = require('body-parser'),
    morgan = require('morgan');

// Configuration for express server
module.exports = function(app, config) {
    app.use(compression());
    app.use(express.static(config.root + '/public'));
    app.set('port', config.port);
    app.set('views', config.root + '/app/views');
    //Using jade templating
    app.set('view engine', 'jade'); 
    app.use(morgan('dev'));
    app.use(bodyParser.urlencoded({extended: true }));
    app.use(bodyParser.json());
    require('./routes')(app, config);
    app.use(function(req, res) {
      res.status(404).render('404', { title: '404' });
    });
};

