var express = require('express');
var app = express();

// Load Express Configuration
var func = require('./expressConfig')
func(app, express);

// Root route
app.get('/', function(req, res){
  res.sendfile('app/index.html');
});

var table = [
  { id: 5, date: new Date('2016-08-18'), days: 13,  weight: 50, controlweight: 49.7 },
  { id: 4, date: new Date('2016-08-15'), days: 11,  weight: 49, controlweight: 47.6 },
  { id: 3, date: new Date('2016-08-14'), days: 10,  weight: 47.5, controlweight: 47.2 },
  { id: 2, date: new Date('2016-08-13'), days: 9,  weight: 46.8, controlweight: 47  },
  { id: 1, date: new Date('2016-08-12'), days: 8,  weight: 46.0, controlweight: 46.7 }
];
var lastId = 5;

app.get('/dashboard', function(req, res) {
  res.json(table);
});

module.exports = app;

// Start the server
var server = app.listen(8000, function() {
 console.log('Listening on port %d', server.address().port);
});
