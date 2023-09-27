var db = require('./db');
const productSchema = new db.mongoose.Schema(
    { 
        image:{type:String,required:true},
        name: { type: String, required: true },
        description:{type:String,required:false},
        price:{type:Number,required:true},
        id_cat:{type: db.mongoose.Schema.Types.ObjectId,ref:'categoryModel'}

    },
    {collection:'products'}
);
const categorySchema = new db.mongoose.Schema({
    name:{type:String,required:true}
},{collection:'category'});


let productModel = db.mongoose.model('productModel',productSchema);
let categoryModel=db.mongoose.model('categoryModel',categorySchema);
module.exports={
    productModel,categoryModel
}