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
    objBill.status="Xác nhận"
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

exports.updatebillPro = async (req, res) => {
  try {
    const idbill = req.params.idbill;
    const bill = await myModel.billModel.findById(idbill);

    if (!bill) {
      return res.status(404).json({ message: 'Không tìm thấy đơn hàng' });
    }

    // Cập nhật trạng thái đơn hàng thành "Xác nhận"
    bill.status = 'Xác nhận';
    await bill.save();

    // Lấy thông tin sản phẩm từ danh sách sản phẩm
    const products = await prModel.productModel.find({ _id: { $in: bill.product.map(p => p.id_product) } });

    // Lấy danh sách đơn hàng sau khi cập nhật
    const posts = await myModel.billModel.find().populate("product.id_product").populate("id_user");

    const user = await usModel.usersModel.find();
    const pro = await prModel.productModel.find();

    res.render("product/order", {
      listProduct: posts,
      user: user,
      pro: pro
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: 'Lỗi ' + err.message });
  }
};
exports.updatebillProHuy = async (req, res) => {
  try {
    const idbill = req.params.idbill;
    const bill = await myModel.billModel.findById(idbill);

    if (!bill) {
      return res.status(404).json({ message: 'Không tìm thấy đơn hàng' });
    }

    // Cập nhật trạng thái đơn hàng thành "Xác nhận"
    bill.status = 'Hủy đơn';
    await bill.save();

    // Lấy thông tin sản phẩm từ danh sách sản phẩm
    const products = await prModel.productModel.find({ _id: { $in: bill.product.map(p => p.id_product) } });

    // Lấy danh sách đơn hàng sau khi cập nhật
    const posts = await myModel.billModel.find().populate("product.id_product").populate("id_user");

    const user = await usModel.usersModel.find();
    const pro = await prModel.productModel.find();

    res.render("product/order", {
      listProduct: posts,
      user: user,
      pro: pro
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: 'Lỗi ' + err.message });
  }
};
