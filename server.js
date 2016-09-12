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
  { date: new Date('2016-08-12'), days: 0,  weight: 46.0, controlweight: 47, week: 1, date1: new Date('2016-08-12'), date2: new Date('2016-08-18') }
];
var controlTable = [46.7, 47, 47.2, 47.6, 48.1, 48.5, 49.0, 49.4, 49.8, 50.2, 50.5, 51, 51.6, 51.9, 52.3, 52.7, 53.1];

app.get('/dashboard', function(req, res) {
  res.json(table);
});

app.post('/dashboard', function(req, res) {
  if(!req.body.hasOwnProperty('weight')) {
    res.statusCode = 400;
    return res.send('Error 400: Post syntax incorrect.');
  }

  var oneDay = 24*60*60*1000;

  var initDate = new Date('2016-08-12');
  initDate.setHours(01, 00, 00);

  var secondDate = new Date(req.body.date);
  secondDate.setHours(01, 00, 00);

  var diffDays = Math.round(Math.abs((secondDate.getTime() - initDate.getTime())/(oneDay)));
  var week = Math.round(diffDays/7)+1;

  var date2 = new Date(initDate.getTime() + week*7*oneDay - oneDay);
  var date1 = new Date(date2.getTime() - 6*oneDay);

  var newWeight = {
    date : req.body.date,
    days : diffDays,
    weight : req.body.weight,
    controlweight : controlTable[week],
    week: week,
    date1: date1,
    date2: date2
  };

  /* update or add new weight record */
  var compareDays = false;
  var selectedDay = 0;
  for (var i=0; i < table.length; i++) {
    if (table[i].days === diffDays) {
      compareDays = true;
      selectedDay = i;
      break;
    };
  };

  if (compareDays) {
    table[selectedDay] = newWeight;
  } else {
    table.unshift(newWeight);
    table.sort(function(a, b) {
      if (a.days < b.days) {
        return 1;
      }
      if (a.days > b.days) {
        return -1;
      }
      // a must be equal to b
      return 0;
    });
  }

  res.json(true);
});




var mySettings = [];

app.get('/settings', function(req, res) {
  res.json(mySettings);
});


app.post('/settings', function(req, res) {
  if(!req.body.hasOwnProperty('dueDate')) {
    res.statusCode = 400;
    return res.send('Error 400: Post syntax incorrect.');
  };

  var newSettings = {
    dueDate: req.body.dueDate,
    weight: req.body.initWeight,
    height: req.body.initHeight,
    diffWeeks: req.body.diffWeeks,
    diffPartWeek: req.body.diffPartWeek
  };

  mySettings[0] = newSettings;
  res.json(true);
});




module.exports = app;

// Start the server
var server = app.listen(8000, function() {
 console.log('Listening on port %d', server.address().port);
});
