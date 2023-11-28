var express = require('express');
var router = express.Router();
var usercontroller =require('../controllers/users.controller');
var check_login = require('../middleware/check_login')

/* GET users listing. */
router.get('/',check_login.request_login,usercontroller.phantrang);
router.get('/add',check_login.request_login,usercontroller.addUser)
router.post('/add',check_login.request_login,usercontroller.addUser);
// router.get('/edit/:iduser',check_login.request_login,usercontroller.editUser);
// router.post('/edit/:iduser',check_login.request_login,usercontroller.editUser);
// router.get('/delete/:iduser',check_login.request_login,usercontroller.deleteUser);
// router.get('/sortusername',check_login.request_login,usercontroller.sortuser);
// router.get('/sortemail',check_login.request_login,usercontroller.sortuseremail);
// router.get('/sortrole',check_login.request_login,usercontroller.sortuserrole);

router.get('/listOder/:id', usercontroller.listOder);

router.get('/searchUser', check_login.request_login, usercontroller.searchUser);
module.exports = router;
