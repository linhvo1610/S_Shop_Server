var express = require('express');
var router = express.Router();
var apiU=require('../controllers/api/api-user');
var apiP = require ('../controllers/api/api-product')


/* GET home page. */

//get users
router.get('/users', apiU.listUsers);

router.post('/users', apiU.addUsers);

router.post('/login', apiU.loginUser);
router.post('/register', apiU.registerUser);
router.get('/register', apiU.registerUser);
router.put('/updateUser/:id', apiU.updateUsers);

// //update 

// router.put('/users/:iduser', apiU.updateUsers);
// //delete
// router.delete('/users/:iduser', apiU.deleteUsers);
// router.get('/balance',apiBalance.listbalance);
// router.post('/balance',apiBalance.addBalance);
// router.get('/balance/:idbalance',apiBalance.updateBalance);
// router.put('/balance/:idbalance',apiBalance.updateBalance);
router.post('/catgory',apiP.addCat);
router.put('/catgory/edit/:id',apiP.editCat);
router.delete('/catgory/delete/:id',apiP.deleteCatgory);
router.get('/product',apiP.listProduct);

router.post('/product',apiP.addProduct);
router.put('/product/edit/:id',apiP.editProduct);
router.delete('/product/delete/:id',apiP.deleteProduct);


module.exports = router;