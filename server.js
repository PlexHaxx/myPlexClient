var express = require('express');
var path = require('path');
var PlexApi = require('plex-api'),
  plexApi = new PlexApi({
    hostname: '192.168.0.100',
    options: {
      product: 'myPlexClient',
      version: '0.1.0',
    }
  });

var app = express();

app.use('/', express.static('./public'));

app.get('/', function(req, res, next) {
  res.sendFile(path.join(__dirname, '/public/index.html'));
});

app.get('/api/cogerImagen', function(req, res, next) {
  console.info(req.query.uri);
  res.json('OK');
  // plexApi.find(req.query.uri)
  //   .then(function(data) {
  //     res.json(data);
  //   }, function(err) {
  //     throw new Error('Not connect with Plex Server');
  //   });
});

app.get('/api/status', function(req, res, next) {
  plexApi.find('/status/sessions')
    .then(function(data){
      res.json(data);
    })
})

app.get('/api/list', function(req, res, next) {
  plexApi.find(req.query.uri)
    .then(function(data) {
      res.json(data);
    }, function(err) {
      throw new Error('Not connect with Plex Server');
    });
})

app.get('/api/find/:search', function(req, res, next) {
  plexApi.find('/library/sections')
    .then(function(data) {
      res.json(data);
    }, function(err) {
      throw new Error('Not connect with Plex Server');
    });
});

app.get('/api/', function(req, res, next) {
  plexApi.find('/')
    .then(function(data) {
      res.send('OK');
    }, function(err) {
      res.send('KO');
      throw new Error('Not connect with Plex Server');
    })
})

app.listen(3000);

console.info('Server is listening on port 3000');
