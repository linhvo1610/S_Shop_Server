var express = require('express');
var router = express.Router();
var controller =require('../controllers/product.controller')

/* GET home page. */
router.get('/', controller.list)

module.exports = router;
