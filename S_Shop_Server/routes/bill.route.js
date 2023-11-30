const express = require('express');
const router = express.Router();
const billController = require('../controllers/bill.controller');


router.get('/listBills',billController.listBill);

router.get('/listBillTK',billController.listThongke);

router.get('/thongketheongay',billController.thongketheongay);
router.get('/thongke',billController.thongke);
router.get('/listBillsXacnhan',billController.listBillXacNhan);
router.get('/listBillsDanhan',billController.listBillsDanhan);
router.get('/listBillsDagiao',billController.listBillsDagiao);
router.get('/listBillsHuydon',billController.listBillsHuydon);
// router.post('/updateStatusBill/:idbill', billController.updateStatusBill);
// router.post('/updateStatusBill1/:idbill', billController.updateStatusBill1);


router.post('/updatebillPro/:idbill', billController.updatebillPro);
router.post('/updatebillProHuy/:idbill', billController.updatebillProHuy);
router.post('/updatebillProGiaohang/:idbill', billController.updatebillProGiaohang);
router.post('/updatebillHoantat/:idbill', billController.updatebillHoantat);

router.get('/seachBill', billController.searchByProductName);
router.get('/searchBillXacNhan', billController.searchBillXacNhan);
router.get('/searchBillDaGiao', billController.searchBillDaGiao);
router.get('/searchBillDaNhan', billController.searchBillDaNhan);


module.exports = router;