const MyModel = require("../../models/product.model")
exports.listProduct = async (req, res, next) => {
    let dataR = {  }

 
    //code xử lý lấy danh sách
    let list = []
    try {
        list = await MyModel.productModel.find();
        dataR.data = list;
    }
    catch (err) {
        dataR.msg = err.message;
    }

    //trả về client
    res.json(dataR);
    console.log(dataR);
}
exports.addProduct = async (req,res,next) =>{
    try {
        let objPr = new MyModel.productModel();
        objPr.name = req.body.name;
        objPr.id_cat = req.body.id_cat;
        objPr.trademark = req.body.trademark;
        objPr.price = req.body.price;
        objPr.quantity= req.body.quantity;
        objPr.size = req.body.size;
        objPr.description = req.body.description;
        objPr.note = req.body.description;
        objPr.image = req.body.image;

        await objPr.save();
        res.status(201).json(objPr);


    } catch (error) {
        return res.status(204).json({msg:error.message});
    }
}
exports.editProduct = async (req,res,next) =>{
    try {
        let id = req.params.id;
        let objPr = await MyModel.productModel.findById(id);
        objPr.name = req.body.name;
        objPr.id_cat = req.body.id_cat;
        objPr.trademark = req.body.trademark;
        objPr.price = req.body.price;
        objPr.quantity= req.body.quantity;
        objPr.size = req.body.size;
        objPr.description = req.body.description;
        objPr.note = req.body.description;
        objPr.image = req.body.image;

        await MyModel.productModel.findByIdAndUpdate(id,objPr);
        res.status(201).json(objPr);


    } catch (error) {
        return res.status(204).json({msg:error.message});
    }
}
exports.deleteProduct = async (req, res, next)=>{
    try {
       let id = req.params.id;
      
      
       await MyModel.productModel.findByIdAndDelete(id);
      return res.status(200).json({data:{}});
    } catch (error) {
       console.log(error);
       
    }
     
     }

exports.listCat = async (req,res,next) =>{
        try {
          let  listTL = await MyModel.categoryModel.find();
          res.json(listTL);
       
        }
        catch (err) {
            dataR.msg = err.message;
        }
    
     
       
     }
exports.addCat = async(req,res,next) =>{
        try {
            let objCt = new MyModel.categoryModel();
            objCt.name = req.body.name;
            await objCt.save();
            res.status(201).json(objCt);
        } catch (error) {
            return res.status(204).json({msg:error.message});
        }
      
     }