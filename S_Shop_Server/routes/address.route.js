const express = require('express');
const router = express.Router();
const addressController = require('../controllers/api/api-address');

router.get('/provinces', addressController.provinces);
router.get('/districts/:parent_code', addressController.districts);
router.get('/wards/:parent_code', addressController.wards);
router.post('/addNew/:id_user',addressController.addNew);
router.get('/all/:id_user',addressController.address);
router.post('/update',addressController.update);
router.post('/delete/:id_address',addressController.delete);

module.exports = router;
