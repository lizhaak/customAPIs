'use strict';

const PORT = 3000;

var http = require('http');
var md5 = require('md5');
var moment = require('moment');

var server = http.createServer(function(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Request-Method', '*');
  res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET');
  res.setHeader('Access-Control-Allow-Headers', '*');

  var urlParts = req.url.match(/[^/]+/g);
  if(urlParts) {
    var path = urlParts.shift();
    switch(path) {
      case 'square':
        var num = parseInt(urlParts[0]);
        var square = Math.pow(num, 2);
        res.write(square.toString());
        break;
      case 'sum':
        var sum = urlParts.reduce(function(y,z){
          return parseInt(y) + parseInt(z); 
        }, 0);
        res.write(sum.toString());
        break;
      case 'sentence':
        var sentence = decodeURI(urlParts[0]);
        var stats = {};
        var letterMatch = sentence.match(/[a-z]/ig) || [];
        stats.letterCount = letterMatch.length;
        stats.wordCount = sentence.split(' ').length;
        stats.avgWordCount = Math.round(stats.letterCount / stats.wordCount);
        res.write(JSON.stringify(stats));
        break;
      case 'gravatar':
        var hashedEmail = md5(urlParts[0]);
        var gravatarUrl = 'http://www.gravatar.com/avatar/' + hashedEmail;
        res.write(gravatarUrl);
        break;
      case 'birthdate':
        var ageStats = {}
        var inputBirthday = moment(urlParts[0], "MMMM Do YYYY").format();
        var now = moment();
        ageStats.age = now.diff(inputBirthday, 'years');
        ageStats.date = moment(urlParts[0]).format("dddd, MMMM DD, YYYY")
        res.write(JSON.stringify(ageStats));
    }
  }

  res.write('\n');
  res.end();

});

server.listen(PORT, function (err){
  console.log('err:', err);
  console.log(`Server listening on port ${PORT}`);

});