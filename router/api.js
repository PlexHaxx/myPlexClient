var express = require('express');
var plexApi = require('plex-api');
var router = express.Router();

router.get('/find', function(req, res, next) {
  res.send('find');
})

module.export = router;
