var express = require('express');
var router = express.Router();
const MyModel = require("../models/model");
var apiU=require('../controllers/api/api-user');
var apiP = require ('../controllers/api/api-product')
var apiC = require ('../controllers/api/api-comment');
var apiB = require('../controllers/api/api-bill')



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
// comment
router.get('/comment', apiC.lisetComment);
router.post('/comment', apiC.postComment);
router.get('/comment/update/:idcomment', apiC.listCommentUP);


router.put('/comment/update/:idcomment', apiC.updateComment);
// delete
router.put('/comment/update/:idcomment', apiC.listCommentUP);
router.delete('/comment/delete/:idcomment', apiC.deleteComment)


// kiem kiem sanpham com ment
router.get('/comment/:idproduct', async (req, res) => {
    const idproduct = req.params.idproduct;
    try {
        const comments = await MyModel.CommentModel.find({ idproduct });
        res.json(comments);
    } catch (err) {
        console.error("Error fetching users:", err);
        res.status(500).send("Internal Server Error");
    }
});

router.get('/bill', apiB.listBill)
router.post('/bill', apiB.addBill)

module.exports = router;