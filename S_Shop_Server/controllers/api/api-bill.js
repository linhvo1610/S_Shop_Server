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
    if ( typeof(req.query.id_product) !== 'undefined') {
        // let id_user = req.query.id_user;
        let id_product = req.query.id_product;
        dieu_kien = {  status: "Done", "product.id_product": id_product };
       
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