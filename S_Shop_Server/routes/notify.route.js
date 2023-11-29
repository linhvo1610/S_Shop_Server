const express = require('express');
const router = express.Router();
const apiController = require('../controllers/api/api-notify');

router.get('/:id_user', apiController.getAll);




module.exports = router;