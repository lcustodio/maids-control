var express = require('express');
var path = require('path');
var app = express();

app.use('/', express.static(path.join(__dirname, 'public')));

app.use('/bower_components', express.static(__dirname + '/bower_components'));

var port = process.env.PORT || 3000;
app.set('port', port);
app.listen(port, function () {
  console.log('Server started at port %s', port);
});