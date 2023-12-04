const express = require('express');
const router = express.Router();
const apiController = require('../controllers/notify.controller');

router.get('/sendNotify', apiController.sendNotify);
router.post('/sendNotify', apiController.sendNotify);




module.exports = router;