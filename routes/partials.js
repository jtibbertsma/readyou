var express = require('express');
var router = express.Router();

/* angular partials */
router.get('/:filename', function (req, res, next) {
  var filename = req.params.filename;
  res.render('partials/' + filename);
});

module.exports = router;