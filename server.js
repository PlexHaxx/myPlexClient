var express = require('express');
var path = require('path');

var app = express();

app.use('/', express.static('./public'));

app.get('/', function(req, res, next) {
  res.sendFile(path.join(__dirname, '/public/index.html'));
});

app.use('/api', require('./router/api'));

app.listen(3000);

console.info('Server is listening on port 3000');
