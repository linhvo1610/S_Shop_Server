const fs = require("fs");
const myModel = require("../models/model");
const BillMore = require('../models/BillMore');

exports.list = async (req, res, next) => {
  //Hiển thị danh sach san pham

  //kiểm tra tồn tại tham số
  let dieu_kien = null;
  if (typeof req.query.username != "undefined") {
    let username = req.query.username;
    dieu_kien = { username: username };
    console.log(dieu_kien);
  }

  //var list=await myModel.spModel.find(dieu_kien).sort({name:1});
  //cair tieens lay them the loai
  var list = await myModel.usersModel.find(dieu_kien);
  console.log(list);

  res.render("users/users", { list: list });
};
exports.addUser = async (req, res, next) => {
  let msg = ""; // ghi câu thông báo

  if (req.method == "POST") {
    let objUser = new myModel.usersModel();
    objUser.email = req.body.email;
    objUser.username = req.body.username;
    objUser.password = req.body.password;
    objUser.role = req.body.role;
    objUser.fullname = req.body.fullname;
    objUser.image = req.body.image;
    objUser.sex = req.body.gender;
    objUser.phone = req.body.phone;
    objUser.dob = req.body.dob;

    try {
      let new_user = await objUser.save();

      console.log(new_user);

      console.log("Đã ghi thành công");
      msg = "Đã thêm thành công";
    } catch (err) {
      console.log(err);
      msg = "Lỗi " + error.message;
    }
  }

  res.render("users/adduser", { msg: msg });
};
exports.phantrang = async (req, res, next) => {
  const page = parseInt(req.query.page) || 1; // Trang hiện tại
  const limit = 9; // Số lượng bản ghi trên mỗi trang

  try {
    const totalPosts = await myModel.usersModel.countDocuments();
    const totalPages = Math.ceil(totalPosts / limit);

    const posts = await myModel.usersModel
      .find()
      .skip((page - 1) * limit)
      .limit(limit);

    res.render("users/users", {
      totalPages,
      currentPage: page,
      list: posts,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal Server Error");
  }
};

exports.listOder = async (req, res, next) => {

  let id = req.params.id;
  let objUser = await myModel.usersModel.findById(id); 
  let userBills = await BillMore.find({ id_user: id, status:5 });

  res.render("users/listOder",{
    objUser:objUser, userBills:userBills
  })

};
