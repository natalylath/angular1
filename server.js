var express = require('express');
var app = express();

// Load Express Configuration
var func = require('./expressConfig')
func(app, express);

var bodyParser = require('body-parser');
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());


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

app.post('/dashboard', function(req, res) {
  if(!req.body.hasOwnProperty('weight')) {
    res.statusCode = 400;
    return res.send('Error 400: Post syntax incorrect.');
  }

lastId += 1;
for (var i=0; i < 3; i++) {
    console.log(req.body.date + '------' +table[i].date);
};

var newWeight = {
    id: lastId,
    date : req.body.date,
    days : 14,
    weight : req.body.weight,
    controlweight : req.body.controlweight
  };

table.unshift(newWeight);
  res.json(true);
});

module.exports = app;

// Start the server
var server = app.listen(8000, function() {
 console.log('Listening on port %d', server.address().port);
});
