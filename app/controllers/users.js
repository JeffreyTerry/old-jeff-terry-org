var mongoose = require('mongoose'),
  User = mongoose.model('User');
 



exports.test = function(io) {
  return function(req, res){
 	res.json(200, {message: "Message received!"});    
  }
};