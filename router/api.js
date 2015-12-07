var express = require('express');
var PlexApi = require('plex-api'),
  plexApi = new PlexApi({
    hostname: '192.168.0.100',
    options: {
      product: 'myPlexClient',
      version: '0.1.0',
    }
  });

var router = express.Router();

router.get('/cogerImagen', function(req, res, next) {
  console.info(req.query.uri);
  res.json('OK');
});

router.get('/status', function(req, res, next) {
  plexApi.find('/status/sessions')
    .then(function(data) {
      res.json(data);
    })
})

router.get('/list', function(req, res, next) {
  plexApi.find(req.query.uri)
    .then(function(data) {
      res.json(data);
    }, function(err) {
      throw new Error('Not connect with Plex Server');
    });
})

router.get('/find/:search', function(req, res, next) {
  plexApi.find('/library/sections')
    .then(function(data) {
      res.json(data);
    }, function(err) {
      throw new Error('Not connect with Plex Server');
    });
});

router.get('/', function(req, res, next) {
  plexApi.find('/')
    .then(function(data) {
      res.send('OK');
    }, function(err) {
      res.send('KO');
      throw new Error('Not connect with Plex Server');
    })
});

module.exports = router;
