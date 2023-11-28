const express = require('express');
const router = express.Router();
const billController = require('../controllers/bill.controller');


router.get('/listBills',billController.listBill);

router.get('/listBillsXacnhan',billController.listBillXacNhan);
router.get('/listBillsDanhan',billController.listBillsDanhan);
router.get('/listBillsDagiao',billController.listBillsDagiao);
router.get('/listBillsHuydon',billController.listBillsHuydon);
// router.post('/updateStatusBill/:idbill', billController.updateStatusBill);
// router.post('/updateStatusBill1/:idbill', billController.updateStatusBill1);


router.post('/updatebillPro/:idbill', billController.updatebillPro);
router.post('/updatebillProHuy/:idbill', billController.updatebillProHuy);
router.post('/updatebillProGiaohang/:idbill', billController.updatebillProGiaohang);

router.get('/list/seachBill', billController.searchByProductName);

module.exports = router;