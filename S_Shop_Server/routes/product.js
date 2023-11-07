var express = require('express');
var router = express.Router();
var proCtl=require('../controllers/product.controller')
var billCtl=require('../controllers/bill.controller')

var multer = require("multer");

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads');
    },
    filename: function name(req, file, cb) {
        cb(null, file.fieldname + "" + Date.now() + "" + file.originalname);
    }
});

const upload = multer({
    storage: storage,
    
}).single('image');

router.get('/list', proCtl.list)
router.get('/list/filter',proCtl.filter);
router.post('/locPrice', proCtl.locPrice)
router.get('/category',proCtl.category);
router.get('/addCategory',proCtl.addCategory);
router.post('/addCategory',proCtl.addCategory);
router.get('/updateCategory/:idTl',proCtl.updateCategory);
router.post('/updateCategory/:idTl',proCtl.updateCategory);
router.get('/deleteCategory/:id', proCtl.deleteCategory);
router.get('/addProduct', proCtl.addProduct)
router.post('/addProduct',upload, proCtl.addProduct)
router.get('/updateProduct/:idsp', proCtl.updateProduct)
router.post('/updateProduct/:idsp', upload ,proCtl.updateProduct)
router.get('/chitiet/:idsp',proCtl.chitietProduct);
router.get('/oder',billCtl.listBill);

module.exports = router;