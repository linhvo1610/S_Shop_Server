const myModel = require("../models/Bill");
const usModel = require("../models/model");
const prModel = require("../models/product.model");

exports.listBill = async (req, res, next) => {
  
  var posts = await myModel.billModel.find().populate("product.id_product").populate("id_user");

  console.log(posts);

  const user = await usModel.usersModel.find();
  const pro = await prModel.productModel.find();

  res.render("product/order", {
    listProduct: posts,
    user: user,
    pro:pro
});

};
exports.updateStatusBill = async (req, res, next) => {
  let msg = '';
  const user = await usModel.usersModel.find();
  const pro = await prModel.productModel.find();
  if (req.method === 'POST') {
    let objBill = new myModel.billModel();
    objBill.status="Success"
    objBill._id=req.params.idbill;

    try {
      await myModel.billModel.findByIdAndUpdate({ _id: req.params.idbill }, objBill);
      console.log("Đã ghi thành công");
            msg = 'Đã ghi thành công';

        } catch (err) {
            console.log(err);
            msg = 'Lỗi ' + err.message;

        }
  }

  res.redirect('/bill/listBills');
 // Redirect the user back to the list of bills
};
exports.updateStatusBill1 = async (req, res, next) => {
  let msg = '';
  const user = await usModel.usersModel.find();
  const pro = await prModel.productModel.find();
  if (req.method === 'POST') {
    let objBill = new myModel.billModel();
    objBill.status="Failed"
    objBill._id=req.params.idbill;

    try {
      await myModel.billModel.findByIdAndUpdate({ _id: req.params.idbill }, objBill);
      console.log("Đã ghi thành công");
            msg = 'Đã ghi thành công';

        } catch (err) {
            console.log(err);
            msg = 'Lỗi ' + err.message;

        }
  }

  res.redirect('/bill/listBills');
 // Redirect the user back to the list of bills
};