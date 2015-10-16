var _ = require('underscore');

// Stores a dictionary with route paths as keys and their corresponding static html files as values.
var URLToFileMap = {
  '/': 'home/home',
  '/fun': 'fun/fun',
  '/godel': 'fun/godel'
};

// Renders the proper web page for all static pages by parsing the route from the req object.
var renderStaticPage = function(req, res){
  res.render(URLToFileMap[req.route.path], {
      title: 'Jeff Terry'
  });
};

module.exports = function(app, config){
/* Client Routes */
  // All static pages
  _.each(URLToFileMap, function(value, key){
    app.get(key, renderStaticPage);
  });

  app.get('/resume', function(req, res){
    res.sendfile(config.root + '/public/imgs/resume.pdf');
  });

  app.get('/transcript', function(req, res){
    res.sendfile(config.root + '/public/imgs/transcript.pdf');
  });
};

