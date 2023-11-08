const express = require('express');
const router = express.Router();
const billController = require('../controllers/bill.controller');


router.get('/listBills',billController.listBill);
// router.post('/updateStatusBill/:idbill', billController.updateStatusBill);
// router.post('/updateStatusBill1/:idbill', billController.updateStatusBill1);


router.post('/updatebillPro/:idbill', billController.updatebillPro);
router.post('/updatebillProHuy/:idbill', billController.updatebillProHuy);

module.exports = router;