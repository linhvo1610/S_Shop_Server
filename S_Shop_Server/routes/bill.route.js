const express = require('express');
const router = express.Router();
const billController = require('../controllers/bill.controller');


router.get('/listBills',billController.listBill);

module.exports = router;