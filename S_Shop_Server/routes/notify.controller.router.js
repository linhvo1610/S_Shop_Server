const express = require('express');
const router = express.Router();
const apiController = require('../controllers/notify.controller');

router.get('/sendNotify', apiController.sendNotify);
router.post('/sendNotify', apiController.sendNotify);

router.get('/listNotify', apiController.listNotify)
router.get('/searchNoitify', apiController.filterNotify);


module.exports = router;