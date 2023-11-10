const Bill = require('../../models/Bill')
exports.listBill = async (req, res) => {
    let dataR = {  }
    let list = []
    let dieu_kien =null;
    if(typeof(req.query.id_user)!='undefined'){
        let id_user =req.query.id_user;
        dieu_kien={id_user:id_user, status: "Xác nhận", };
        console.log(dieu_kien);
    }
    try {
        list = await Bill.billModel.find(dieu_kien);
        dataR.data = list;
    }
    catch (err) {
        dataR.msg = err.message;
    }
    res.json(dataR);
    console.log(dataR);
}

exports.listBillGiaohang = async (req, res) => {
    let dataR = { }
    let list = []
    let dieu_kien =null;
    if(typeof(req.query.id_user)!='undefined'){
        let id_user =req.query.id_user;
        dieu_kien={id_user:id_user, status: "Đang giao",};
        console.log(dieu_kien);
    }
    try {
        list = await Bill.billModel.find(dieu_kien).populate("id_user").populate("product.id_product");
        dataR.data = list;
    }
    catch (err) {
        dataR.msg = err.message;
    }
    res.json(dataR);
    console.log(dataR);
}

exports.listBillDaGiaohang = async (req, res) => {
    let dataR = { }
    let list = []
    let dieu_kien =null;
    if(typeof(req.query.id_user)!='undefined'){
        let id_user =req.query.id_user;
        dieu_kien={id_user:id_user, status: "Đã giao",};
        console.log(dieu_kien);
    }
    try {
        list = await Bill.billModel.find(dieu_kien).populate("id_user").populate("product.id_product");
        dataR.data = list;
    }
    catch (err) {
        dataR.msg = err.message;
    }
    res.json(dataR);
    console.log(dataR);
}
exports.listBillChoxacnhan = async (req, res) => {
    let dataR = {  }
    let list = []
    let dieu_kien =null;
    if(typeof(req.query.id_user)!='undefined'){
        let id_user =req.query.id_user;
        let id_product = req.query.id_product;
        dieu_kien={id_user:id_user, status: "Chờ xác nhận"};
        console.log(dieu_kien);
    }
    try {
        list = await Bill.billModel.find(dieu_kien).populate("id_user").populate("product.id_product");
        dataR.data = list;
    }
    catch (err) {
        dataR.msg = err.message;
    }
    res.json(dataR);
    console.log(dataR);
}


exports.listBillQuantity = async (req, res) => {
    let dataR = {  }
    let list = []
    let dieu_kien =null;
    if ( typeof(req.query.id_product) !== 'undefined') {
        // let id_user = req.query.id_user;
        let id_product = req.query.id_product;
        dieu_kien = {  status: "Xác nhận", "product.id_product": id_product };
        console.log(dieu_kien);
    }
    try {
        list = await Bill.billModel.find(dieu_kien);
        dataR.data = list;
    }
    catch (err) {
        dataR.msg = err.message;
    }
    res.json(dataR);
    console.log(dataR);
}

exports.listBillname = async (req, res) => {
    let dataR = {  }
    let list = []
    let dieu_kien =null;
    if ( typeof(req.query.id_product) !== 'undefined') {
        // let id_user = req.query.id_user;
        let id_product = req.query.id_product;
        dieu_kien = {  status: "Chờ xác nhận", "product.id_product": id_product };
       
        console.log(dieu_kien);
    }
    try {
        list = await Bill.billModel.find(dieu_kien);
        dataR.data = list;
    }
    catch (err) {
        dataR.msg = err.message;
    }
    res.json(dataR);
    console.log(dataR);
}
exports.listBillDone = async (req, res) => {
    let dataR = {  }
    let list = []
    let dieu_kien =null;
    if ( typeof(req.query.id_user) != 'undefined') {
        let id_user = req.query.id_user;
        // let id_product = req.query.id_product;
        dieu_kien = {id_user:id_user, status: "Đã nhận",};
       
        console.log(dieu_kien);
    }
    try {
        list = await Bill.billModel.find(dieu_kien).populate("id_user").populate("product.id_product");
        dataR.data = list;
    }
    catch (err) {
        dataR.msg = err.message;
    }
    res.json(dataR);
    console.log(dataR);
}

exports.addBill = async (req,res) =>{
    let dataR = {
    }
    if(req.method =='POST'){
        let objPr = new Bill.billModel();
        objPr.id_user = req.body.id_user;
        objPr.id_address = req.body.id_address;
        objPr.status = req.body.status;
        objPr.totalPrice = req.body.totalPrice;
        objPr.totalQuantity = req.body.totalQuantity;
        objPr.size = req.body.size;
        objPr.date = new Date();
        if (req.body.product && Array.isArray(req.body.product)) {
            objPr.product = req.body.product.map((id_product) => ({
              id_product: id_product,
            }));
          } else {
            objPr.product = [];
          }
        try{
            let dataR = await objPr.save();
            console.log(dataR);
            console.log("Đã ghi thành công");
        }catch(err){
            console.log(err);
            dataR.msg = err.message;
        }
    }
    res.json(dataR)
    
}
exports.huydon = async (req, res) => {
    let dataR = {
        status: 1,
        msg: "Xoa thanh cong"
    }
    try {
        await Bill.billModel.findByIdAndDelete({ _id: req.params.id });
        console.log("Xoa thanh cong");

    } catch (err) {
        console.log(err);
        dataR.msg = err.message;
    }
    res.json(dataR);
    console.log(dataR);
}

exports.updateStatus = async (req, res) => {
    let data = {
        status: 1,
        msg: "update"
      };
      
      if (req.method == 'PUT') {
        try {
          await Bill.billModel.updateOne({ _id: req.params.id }, {
            $set: {
              id_user: req.body.id_user,
              id_address: req.body.id_address,
              status: req.body.status,
              totalPrice: req.body.totalPrice,
              totalQuantity: req.body.totalQuantity,
              size: req.body.size,
              date: new Date(),
              product: req.body.product && Array.isArray(req.body.product) ? req.body.product.map((id_product) => ({
                id_product: id_product
              })) : []
            }
          });
      
          res.status(200).json(data);
        } catch (error) {
          res.status(500).json({ status: 0, msg: "Internal server error" });
        }
      } else {
        res.status(400).json({ status: 0, msg: "Invalid request method" });
      }
      
  };