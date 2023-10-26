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
exports.addProduct = async (req, res, next) => {
  const loaiSP = await myModel.categoryModel.find();
if (req.method == "POST") {
  
  let objPr = new myModel.productModel();
    objPr.name = req.body.name;
    objPr.id_cat = req.body.id_cat;
    objPr.trademark = req.body.trademark;
    objPr.price = req.body.price;
    objPr.description = req.body.description;
    objPr.image = req.file.filename;
    objPr.sizes = req.body.sizes.map((size) => ({
      size: size.size,
      quantity: size.quantity
    }))


  try {
    await objPr.save();
    console.log(new_sp);
    console.log("Đăng Kí Thành Công");
  } catch (error) {
    msg = "Lỗi " + error.message;
  }
}
res.render("product/addProduct", {
  listLoai: loaiSP,
});
}

exports.category =async(req,res,next) => {
  const loaiSP = await myModel.categoryModel.find();

  res.render("product/category", {listLoai: loaiSP,});
}
exports.updateProduct = async(req, res, next) => {
  const loaiSP = await myModel.categoryModel.find();
  let objPr = await myModel.productModel.findById(req.params.idsp)
  if (req.method == "POST") {
    
    let objPr = new myModel.productModel();
      objPr.name = req.body.name;
      objPr.id_cat = req.body.id_cat;
      objPr.trademark = req.body.trademark;
      objPr.price = req.body.price;
      objPr.description = req.body.description;
      objPr.image = req.file.filename;
      objPr.sizes = req.body.sizes.map((size) => ({
        size: size.size,
        quantity: size.quantity,
      }))
      objPr._id = req.params.idsp;
  
    try {
      // await objPr.save();
      await myModel.productModel.findByIdAndUpdate({ _id: req.params.idsp }, objPr)
      console.log(new_sp);
      console.log("Đăng Kí Thành Công");
    } catch (error) {
      msg = "Lỗi " + error.message;
    }
  }
  res.render("product/editProduct", {
    listLoai: loaiSP,objPr : objPr,
  });
}