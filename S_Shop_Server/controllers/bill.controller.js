const myModel = require("../models/BillMore");
const usModel = require("../models/model");
const prModel = require("../models/product.model");
const Address = require("../models/Address");
const BillMore = require("../models/BillMore");
const axios = require('axios');
const Notify = require("../models/Notify");

exports.listBill = async (req, res, next) => {

  var posts = await myModel.find({ status: 0 });

  console.log(posts);

  res.render("product/order", {
    listBill: posts,
  });
}

exports.listBillXacNhan = async (req, res, next) => {

  var posts = await BillMore.find({ status: 1 });

  console.log(posts);

  res.render("product/XacNhanBill", {
    listBill: posts,
  });
};



exports.listBillsDanhan = async (req, res, next) => {

  var posts = await BillMore.find({ status: 3 })

  console.log(posts);
  res.render("product/DaNhanBill", {
    listBill: posts,
  });
}
exports.listBillsHuydon = async (req, res, next) => {

  var posts = await BillMore.find({ status: 4 })

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
    pro: pro, address: address
  });
}

exports.updateStatusBill = async (req, res, next) => {
  let msg = '';
  const user = await usModel.usersModel.find();
  const pro = await prModel.productModel.find();
  if (req.method === 'POST') {
    let objBill = new myModel.billModel();
    objBill.status = "Xác nhận"
    objBill._id = req.params.idbill;

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
    objBill.status = "Failed"
    objBill._id = req.params.idbill;

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

const sendNotification = async (status, content, token) => {
  console.log(token);
  const data = {
    "data": {
      "title": "Có thông báo mới",
      "body": content,
      "status": status
    },
    "to": token
  };

  const headers = {
    "Authorization": 'key=AAAA0ev3PJg:APA91bHTxySW9rLJIK_w3kftopTPUJHR7RTIuZK8rFFvCi2G5EKk1EHoq-rVARhldurbbuSGo6QAPw91X12ohT1IGbjjeQVO8lWZEnry0c8o9IojlPkTsfK0JLFQb48j1UglV_x6LQTO',
    "Content-Type": "application/json"
};

axios.post('https://fcm.googleapis.com/fcm/send', data, { headers })
    .then(function (response) {
        console.log('gửi thông báo đến thiết bị thành công', data)
    })
    .catch(function (error) {
        console.log('gửi thông báo đến thiết bị thất bại', error)
    })


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
    await bill.save().then(async () => {
      const posts = await BillMore.find()

      const user = await usModel.usersModel.find();
      const pro = await prModel.productModel.find();
      const address = await Address.find();
      const userToken = await usModel.usersModel.findById(bill.id_user);
      const filteredPosts = posts.filter(post => post.status === 0);
      
      sendNotification(bill.status, "Đơn hàng có mã " + idbill + " đã được xác nhận", userToken.tokenNotify)
      res.redirect("/bill/listBills");
      res.render("product/order", {
        listBill: filteredPosts,
        user: user,
        pro: pro, address: address
      });
    });



  } catch (err) {
    // console.log(err);
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
    setTimeout(async function () {
      bill.status = 2;
      await bill.save();

      setTimeout(async function () {
        bill.status = 3;
        await bill.save();
        const userToken = await usModel.usersModel.findById(bill.id_user);
        sendNotification(bill.status, 'Đơn hàng có mã ' + idbill + 'đang được vận chuyển', userToken.tokenNotify)

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
    const bill = await BillMore.findById(idbill);

    if (!bill) {
      return res.status(404).json({ message: 'Không tìm thấy đơn hàng' });
    }

    bill.status = 4;
    await bill.save();
    const userToken = await usModel.usersModel.findById(bill.id_user);
    sendNotification(bill.status, 'Đơn hàng có mã ' + idbill + 'đã bị hủy', userToken.tokenNotify)
    res.redirect("/bill/listBills");
    const posts = await BillMore.find()
    res.render("product/order", {
      listBill: posts,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: 'Lỗi ' + err.message });
  }
};

exports.BillOfUser = async (req, res, next) => {
  let objSp = await BillMore.findById(req.params.idUser).populate("id_user");
  let list = await usModel.findOne({ _id: objSp.idUser });
  let objBill = new myModel.billModel();
  objBill.status = 5;
  const loaiSP = await BillMore.find();
  res.render('users/users', { title: 'chitiet', objSp: objSp, listLoai: loaiSP })
}
exports.searchByProductName = async (req, res, next) => {
  const productName = req.query.name_product;

  try {
    const results = await BillMore.find({ 'list.name_product': { $regex: new RegExp(productName, 'i') }, status: 0 }); 
    res.render('product/order', { 
      listBill: results,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while processing your request' });
  }
};

exports.searchBillXacNhan = async (req, res, next) =>{
  const searchInput = req.query.name_product;

  try {
    // // Use $regex with a valid string
    const product = await BillMore.find({ 'list.name_product' : { $regex: new RegExp(searchInput, 'i') }, status: 1});

  res.render('product/XacNhanBill', {
    listBill: product
  });

} catch (error) {
    console.error('Error fetching items:', error);
    res.status(500).json({ error: 'Internal server error' });
}
}

exports.searchBillDaGiao = async (req, res, next) =>{
  const searchInput = req.query.name_product;

  try {
    // // Use $regex with a valid string
    const product = await BillMore.find({ 'list.name_product' : { $regex: new RegExp(searchInput, 'i') }, status: 2});

    const filteredPosts = product.filter(post => post.status == 2);

  res.render('product/DaGiaoBill', {
    listBill: filteredPosts
  });

} catch (error) {
    console.error('Error fetching items:', error);
    res.status(500).json({ error: 'Internal server error' });
}
}

exports.searchBillDaNhan = async (req, res, next) =>{
  const searchInput = req.query.name_product;

  try {
    // // Use $regex with a valid string
    const product = await BillMore.find({ 'list.name_product' : { $regex: new RegExp(searchInput, 'i') }, status: 3});

  res.render('product/DaNhanBill', {
    listBill: product
  });

} catch (error) {
    console.error('Error fetching items:', error);
    res.status(500).json({ error: 'Internal server error' });
}
}