const myModel = require("../models/product.model");
const billModel = require("../models/Bill")

exports.list = async (req, res, next) => {
  
  let dieu_kien =null;
  let dieu_kien1 = null;
  if(typeof(req.query.id_cat)!='undefined'||typeof(req.query.sizes)!='undefined'){
      let id_cat =req.query.id_cat;
      let size = req.query.sizes;
      dieu_kien={id_cat:id_cat,'sizes.size': size};
      dieu_kien1 = {size:size};
      console.log(dieu_kien);
  }
  var posts = await myModel.productModel.find(dieu_kien1).populate("id_cat"); // ten cot tham chieu

  console.log(posts);

  const loaiSP = await myModel.categoryModel.find();

  res.render("product/list", {
    listProduct: posts,
    listLoai: loaiSP,
});
};
exports.chitietProduct = async (req, res, next) => {
  let objSp = await myModel.productModel.findById(req.params.idsp).populate("id_cat");
  let listtl=await myModel.categoryModel.findOne({_id:objSp.the_loai});  
  const loaiSP = await myModel.categoryModel.find();
  res.render('product/chitiet', { title: 'chitiet', objSp: objSp, listtl: listtl,listLoai:loaiSP })
}
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
  
  let filter = {};
  if (typeof req.query.id_cat !== 'undefined' || typeof req.query.size !== 'undefined') {
    let id_cat = req.query.id_cat;
    let size = req.query.size;
    console.log("id_cat:", id_cat);
    console.log("size:", size);
    
   
    if (id_cat && size) {
      filter = { $or: [ { "id_cat": id_cat }, { "sizes": { $elemMatch: { "size": size } } } ] };
    } else if (id_cat) {
      filter = { "id_cat": id_cat };
    } else if (size) {
      filter = { "sizes": { $elemMatch: { "size": size } } };
    }
  
    console.log("filter:", filter);
    // Use the 'filter' object in your MongoDB query
  }

  var posts = await myModel.productModel.find(filter).populate("id_cat"); // ten cot tham chieu

  console.log(posts);

  const loaiSP = await myModel.categoryModel.find();

  // const selectedSize = req.query.size;
  // const filteredProducts = posts.filter((product) => {
  //   return product.sizes.some((size) => size.size === selectedSize);
  // });

  res.render("product/list", {
    listProduct: posts,
    listLoai: loaiSP,
    // product: filteredProducts,
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
    objPr.status = req.body.status || true;


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
exports.addCategory = async (req, res, next) => {
  const loaiSP = await myModel.categoryModel.find();
  if (req.method == 'POST') {
    let objSp = new myModel.categoryModel();
    objSp.name = req.body.name;
    try {
        let new_sp = await objSp.save();
        console.log(new_sp);
        msg = "da them thanh cong "
        res.redirect('/product/Category');
    } catch (error) {
        console.log(error);
    }
}
  res.render("product/addCategory", {listLoai:loaiSP});
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
      objPr.status = req.body.status;
  
    try {
      // await objPr.save();
      await myModel.productModel.findByIdAndUpdate({ _id: req.params.idsp }, objPr)
      console.log(new_sp);
    
    } catch (error) {
      msg = "Lỗi " + error.message;
    }
  }
  res.render("product/editProduct", {
    listLoai: loaiSP,objPr : objPr,
  });
}
exports.updateCategory = async (req, res, next) => {
  let msg = '';
  let objSp = await myModel.categoryModel.findById(req.params.idTl);
  console.log(objSp);
  if (req.method == 'POST') {
      let objSP = new myModel.categoryModel();
      objSP.name = req.body.name;
      objSP._id = req.params.idTl;
      try {
          // update dữ liệu
          // await myModel.spModel.updateOne( {_id:  req.params.idsp},   objSP );
          await myModel.categoryModel.findByIdAndUpdate({ _id: req.params.idTl }, objSP);

          console.log("Đã ghi thành công");
          msg = 'Đã ghi thành công';
          res.redirect('/product/Category');
      } catch (err) {
          console.log(err);
          msg = 'Lỗi ' + err.message;
      }
  }
  res.render('product/updateCategory', { title: 'updateCategories', msg: msg , objSp:objSp })
}
exports.deleteCategory = async (req, res, next) => {
  let mssg = '';
  try {
      let id = req.params.id;
      var product_delete = await myModel.categoryModel.findByIdAndDelete(id);
      if (!product_delete) {
          mssg = "that bai";
          console.log(mssg);
      } else {
          mssg: " da xoa";
          res.redirect('/product/Category');

      }

  } catch (err) {
      res.status(500).json({ message: err.message })

  }
}
  