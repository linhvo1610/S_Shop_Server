const myModel = require("../models/Bill");
const usModel = require("../models/model");
const prModel = require("../models/product.model");
const Address = require("../models/Address");

exports.listBill = async (req, res, next) => {
  
  var posts = await myModel.billModel.find().populate("product.id_product").populate("id_user").populate("id_address");

  console.log(posts);

  const user = await usModel.usersModel.find();
  const pro = await prModel.productModel.find();
  const address = await Address.find();

  // const filteredPosts = posts.filter(post => post.status !== "Đã nhận");
  const filteredPosts = posts.filter(post => post.status == "Chờ xác nhận");


  res.render("product/order", {
    listProduct: filteredPosts,
    user: user,
    pro:pro,address:address
});
}

exports.listBillXacNhan = async (req, res, next) => {
  
  var posts = await myModel.billModel.find().populate("product.id_product").populate("id_user").populate("id_address");

  console.log(posts);

  const user = await usModel.usersModel.find();
  const pro = await prModel.productModel.find();
  const address = await Address.find();

  const filteredPosts = posts.filter(post => post.status == "Xác nhận");


  res.render("product/XacNhanBill", {
    listProduct: filteredPosts,
    user: user,
    pro:pro,address:address
});
};

exports.listBillsDanhan = async (req, res, next) => {
  
  var posts = await myModel.billModel.find().populate("product.id_product").populate("id_user").populate("id_address");

  console.log(posts);

  const user = await usModel.usersModel.find();
  const pro = await prModel.productModel.find();
  const address = await Address.find();

  const filteredPosts = posts.filter(post => post.status == "Đã nhận");


  res.render("product/XacNhanBill", {
    listProduct: filteredPosts,
    user: user,
    pro:pro,address:address
});
}
exports.listBillsDagiao = async (req, res, next) => {
  
  var posts = await myModel.billModel.find().populate("product.id_product").populate("id_user").populate("id_address");

  console.log(posts);

  const user = await usModel.usersModel.find();
  const pro = await prModel.productModel.find();
  const address = await Address.find();

  const filteredPosts = posts.filter(post => post.status == "Đã giao");


  res.render("product/DaGiaoBill", {
    listProduct: filteredPosts,
    user: user,
    pro:pro,address:address
});
}

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
    const posts = await myModel.billModel.find().populate("product.id_product").populate("id_user").populate("id_address");

    const user = await usModel.usersModel.find();
    const pro = await prModel.productModel.find();
    const address = await Address.find();
    const filteredPosts = posts.filter(post => post.status === "Chờ xác nhận");
    

    res.render("product/order", {
      listProduct: filteredPosts,
      user: user,
      pro: pro,address:address
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: 'Lỗi ' + err.message });
  }
};
exports.updatebillProGiaohang = async (req, res) => {
  try {
    const idbill = req.params.idbill;
    const bill = await myModel.billModel.findById(idbill);

    if (!bill) {
      return res.status(404).json({ message: 'Không tìm thấy đơn hàng' });
    }

    // Cập nhật trạng thái đơn hàng thành "Xác nhận"
    bill.status = 'Xác nhận';
    await bill.save();
    setTimeout(async function() {
      bill.status = 'Đang giao';
      await bill.save();
    
      setTimeout(async function() {
        bill.status = 'Đã giao';
        await bill.save();
  
        res.redirect("/bill/listBills");
        const products = await prModel.productModel.find({ _id: { $in: bill.product.map(p => p.id_product) } });
        const posts = await myModel.billModel.find().populate("product.id_product").populate("id_user").populate("id_address");
        const user = await usModel.usersModel.find();
        const pro = await prModel.productModel.find();
        const address = await Address.find();

        const filteredPosts = posts.filter(post => post.status === "Xác nhận");


        res.render("product/order", {
          listProduct: filteredPosts,
          user: user,
          pro: pro,
          address: address
        });
      }, 3000);
  }, 2000);
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
    const posts = await myModel.billModel.find().populate("product.id_product").populate("id_user").populate("id_address");;

    const user = await usModel.usersModel.find();
    const pro = await prModel.productModel.find();
    const address = await Address.find();
    res.render("product/order", {
      listProduct: posts,
      user: user,
      pro: pro,address:address
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: 'Lỗi ' + err.message });
  }
};
