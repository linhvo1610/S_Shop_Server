const myModel = require("../models/Bill");
const usModel = require("../models/model");
const prModel = require("../models/product.model");

exports.listBill = async (req, res, next) => {
  
  var posts = await myModel.billModel.find().populate("id_user","product"); // ten cot tham chieu

  console.log(posts);

  const user = await usModel.usersModel.find();
  const pro = await prModel.productModel.find();

  res.render("product/order", {
    listProduct: posts,
    user: user,
    pro:pro
});
};