const myModel = require("../models/BillMore");
const usModel = require("../models/model");
const prModel = require("../models/product.model");
const Address = require("../models/Address");
const BillMore = require("../models/BillMore");

exports.listBill = async (req, res, next) => {
  
  var posts = await myModel.find({status: 0});

  console.log(posts);

  res.render("product/order", {
    listBill: posts,
});
}

exports.listBillXacNhan = async (req, res, next) => {

  var posts = await BillMore.find({status: 1});

  console.log(posts);

  res.render("product/XacNhanBill", {
    listBill: posts,
});
};

exports.listBillsDanhan = async (req, res, next) => {
  
  var posts = await BillMore.find({status: 3})

  console.log(posts);
  res.render("product/DaNhanBill", {
    listBill: posts,
});
}
exports.listBillsHuydon = async (req, res, next) => {
  
  var posts = await BillMore.find({status: 4})

  console.log(posts);

  res.render("product/HuyDon", {
    listBill: posts,
});
}
exports.listBillsDagiao = async (req, res, next) => {
  
  var posts = await BillMore.find()

  console.log(posts);

  const user = await usModel.usersModel.find();
  const pro = await prModel.productModel.find();
  const address = await Address.find();

  const filteredPosts = posts.filter(post => post.status == 2);


  res.render("product/DaGiaoBill", {
    listBill: filteredPosts,
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
    const bill = await BillMore.findById(idbill);

    if (!bill) {
      return res.status(404).json({ message: 'Không tìm thấy đơn hàng' });
    }

    // Cập nhật trạng thái đơn hàng thành "Xác nhận"
    bill.status = 1;
    await bill.save();

    const posts = await BillMore.find()

    const user = await usModel.usersModel.find();
    const pro = await prModel.productModel.find();
    const address = await Address.find();
    const filteredPosts = posts.filter(post => post.status === 0);
    

    res.render("product/order", {
      listBill: filteredPosts,
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
    const bill = await BillMore.findById(idbill);

    if (!bill) {
      return res.status(404).json({ message: 'Không tìm thấy đơn hàng' });
    }

    // Cập nhật trạng thái đơn hàng thành "Xác nhận"
    bill.status = 1;
    await bill.save();
    setTimeout(async function() {
      bill.status = 2;
      await bill.save();
    
      setTimeout(async function() {
        bill.status = 3;
        await bill.save();
  
        res.redirect("/bill/listBillsDagiao");
        const posts = await BillMore.find()
        const user = await usModel.usersModel.find();
        const pro = await prModel.productModel.find();
        const address = await Address.find();

        const filteredPosts = posts.filter(post => post.status === 1);


        res.render("product/DaGiaoBill", {
          listBill: filteredPosts,
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
