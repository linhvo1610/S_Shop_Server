const myModel = require("../models/product.model");

exports.list = async (req, res, next) => {
  var posts = await myModel.productModel.find().populate("id_cat"); // ten cot tham chieu

  console.log(posts);

  const loaiSP = await myModel.categoryModel.find();

  res.render("product/list", {
    listProduct: posts,
    listLoai: loaiSP,
});
};
exports.locPrice = async (req, res, next) => {
  const size = req.body.size;
  const description = req.body.description;

  var pro = await myModel.productModel.find({id_cat: req.body.id_cat, size,description})
  .populate("id_cat");
  console.log(pro);

  const loaiSP = await myModel.categoryModel.find();

  res.render("product/list", {
    listProduct: pro,
    listLoai: loaiSP,
});
}



