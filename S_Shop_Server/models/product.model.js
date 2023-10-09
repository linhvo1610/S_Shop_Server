var db = require('./db');
const productSchema = new db.mongoose.Schema(
    {
      name: { type: String, required: true },
      id_cat: { type: db.mongoose.Schema.Types.ObjectId, ref: 'categoryModel' },
      trademark: { type: String, required: true },
      price: { type: Number, required: true },
      sizes: [
        {
          size: { type: Number, required: true },
          quantity: { type: Number, required: true },
        },
      ],
      description: { type: String, required: false },
      note: { type: String, required: true },
      image: { type: String, required: false },
    },
    { collection: 'products' }
  );
  
const categorySchema = new db.mongoose.Schema({
    name:{type:String,required:true}
},{collection:'category'});
let productModel = db.mongoose.model('productModel',productSchema);
let categoryModel=db.mongoose.model('categoryModel',categorySchema);
module.exports={
    productModel,categoryModel
}