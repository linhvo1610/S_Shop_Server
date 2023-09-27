var express = require('express');
var router = express.Router();
var apiU=require('../controllers/api/api-user');

/* GET home page. */

//get users
router.get('/users', apiU.listUsers);

// //post users
// router.post('/users', apiU.addUsers);
// //update 

// router.put('/users/:iduser', apiU.updateUsers);
// //delete
// router.delete('/users/:iduser', apiU.deleteUsers);
// router.get('/balance',apiBalance.listbalance);
// router.post('/balance',apiBalance.addBalance);
// router.get('/balance/:idbalance',apiBalance.updateBalance);
// router.put('/balance/:idbalance',apiBalance.updateBalance);




module.exports = router;