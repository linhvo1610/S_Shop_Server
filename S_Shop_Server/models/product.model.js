var db = require('./db');
const productSchema = new db.mongoose.Schema(
    {
      name: { type: String, required: true },
      id_cat: { type: db.mongoose.Schema.Types.ObjectId, ref: 'categoryModel' },
      trademark: { type: String, required: true },
      price: { type: Number, required: true },
      sizes: [
        {
          size: { type: Number, required: false },
          quantity: { type: Number, required: false },
        },
      ],
      description: { type: String, required: true },
      image: { type: String, required: true },
    },
    { collection: 'products' }
  );
  
const categorySchema = new db.mongoose.Schema({
    name:{type:String,required:true}
},{collection:'category'});
// const CommentSchema = new db.mongoose.Schema({
//   // idproduct : {type: db.mongoose.Schema.Types.ObjectId, required: false, ref: 'productModel'},
//   idProduct: {type: String, required:false},
//   idUser: {type: String, required:false},
//   comment: {type: String, required:false}
// },{
//   collection: 'Comment'
// });

// let CommentModel = db.mongoose.model('commentModel',CommentSchema)
let productModel = db.mongoose.model('productModel',productSchema);
let categoryModel=db.mongoose.model('categoryModel',categorySchema);
module.exports={
    productModel,categoryModel
}