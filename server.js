var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var fs = require('fs');
var instructions = require('./src/instructions');
var payments = require('./src/payments');

var app = express();

/* Creating a text parser */
var textParser = bodyParser.text({ type: 'text/plain' });
/* Creating a json parser */
var jsonParser = bodyParser.json();
app.use(bodyParser.urlencoded({extended: true}));

app.use('/', express.static(path.join(__dirname, 'public')));
app.use('/bower_components', express.static(__dirname + '/bower_components'));

app.get('/instructions', textParser, instructions.readInstructions);
app.post('/instructions', textParser, instructions.saveInstructions);

app.get('/payments', jsonParser, payments.getPayments);
app.post('/payments', jsonParser, payments.savePayments);

app.get('/monthsmax', jsonParser, payments.monthsmax);

var port = process.env.PORT || 3000;
app.set('port', port);
app.listen(port, function () {
  console.log('Server started at port %s', port);
});