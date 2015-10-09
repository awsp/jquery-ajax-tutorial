var express = require('express');
var router = express.Router();
var userRepo = require('../repos/users');

// Initialize table since we are using in-memory database
userRepo.init();

/* GET users listing. */
router.get('/', function(req, res, next) {
  userRepo.getAllUser().done(function (results) {
    res.json(results);
  });
});

router.post('/', function (req, res, next) {
  var user = req.body;

  // Let's ignore validation, as this is beyond the scope.
  userRepo.insertUser(user).done(function (response) {
    res.json(response)
  });
});

module.exports = router;
