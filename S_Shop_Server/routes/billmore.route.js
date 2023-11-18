const express = require('express');
const router = express.Router();
const apiController = require('../controllers/api/api-billmore');

router.post('/cancel/:id_bill', apiController.cancelBill);
router.post('/add', apiController.addBill);
router.get('/:id_user', apiController.getAll);


module.exports = router;