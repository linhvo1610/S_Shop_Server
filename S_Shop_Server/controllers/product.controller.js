const myModel = require("../models/product.model");

exports.list = async (req, res, next) => {
  
  let dieu_kien =null;
  if(typeof(req.query.id_cat)!='undefined'){
      let id_cat =req.query.id_cat;
      dieu_kien={id_cat:id_cat};
      console.log(dieu_kien);
  }
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
exports.filter = async (req, res, next) => {
  
  let dieu_kien =null;
  if(typeof(req.query.id_cat)!='undefined'){
      let id_cat =req.query.id_cat;
      dieu_kien={id_cat:id_cat};
      console.log(dieu_kien);
  }
  var posts = await myModel.productModel.find(dieu_kien).populate("id_cat"); // ten cot tham chieu

  console.log(posts);

  const loaiSP = await myModel.categoryModel.find();

  res.render("product/list", {
    listProduct: posts,
    listLoai: loaiSP,
});
};


