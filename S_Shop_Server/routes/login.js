var express = require('express');
var router = express.Router();
// nhúng controller 
var userloginController = require('../controllers/login.controller');
var check_login = require('../middleware/check_login')
router.get('/login', userloginController.userLogin);
router.post('/login', userloginController.userLogin);
// router.get('/register',userloginController.UserRegister);
// router.post('/register',userloginController.UserRegister);
router.get('/logout',userloginController.UserLogout);

module.exports = router;