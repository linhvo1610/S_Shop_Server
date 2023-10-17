var express = require('express');
var router = express.Router();
var proCtl=require('../controllers/product.controller')

/* GET home page. */
router.get('/list', proCtl.list)
router.get('/list/filter',proCtl.filter);

router.post('/locPrice', proCtl.locPrice)
router.get('/category',proCtl.category);

router.get('/addProduct', proCtl.addProduct)
router.post('/addProduct', proCtl.addProduct)
router.get('/addCategory',proCtl.addCategory);
router.post('/addCategory',proCtl.addCategory);


module.exports = router;