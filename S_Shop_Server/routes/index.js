var express = require('express');
var router = express.Router();
var homecontroller=require('../controllers/home.controller')

/* GET home page. */
router.get('/', homecontroller.index)

module.exports = router;
