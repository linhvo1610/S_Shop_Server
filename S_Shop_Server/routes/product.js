var express = require('express');
var router = express.Router();
var proCtl=require('../controllers/product.controller')

/* GET home page. */
router.get('/list', proCtl.list)


router.post('/locPrice', proCtl.locPrice)

module.exports = router;