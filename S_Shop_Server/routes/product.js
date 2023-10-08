var express = require('express');
var router = express.Router();
var proCtl=require('../controllers/product.controller')

/* GET home page. */
router.get('/list', proCtl.list)
router.get('/list/filter',proCtl.filter);

router.post('/locPrice', proCtl.locPrice)
router.get('/category',proCtl.category);

module.exports = router;