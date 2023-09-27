var db = require('./db');
const userSchema = new db.mongoose.Schema(
    {
        email: { type: String, required: true },
        fullname: { type: String, required: true },
        username:{type:String,required:true},
        password:{type:String,required:true},
        image: { type: String, required: true },
        phone: { type: String, required: true },
        dob: { type: String, required: true },
        sex: { type: String, required: true },
        role: {type:String,required: true}
    },
    {collection:'users'}
);


// const categorySchema = new db.mongoose.Schema(
//     {   name: { type: String, required: true },
//         image:{type: String}   
//     },
//     {collection:'category'}
// );

// const balanceSchema = new db.mongoose.Schema({
//     id_user:{type: db.mongoose.Schema.Types.ObjectId,ref:'usersModel'},
//     balance:{type:Number,required:true}
// },{collection:'balance'});

// const recordSchema = new db.mongoose.Schema({
//     id_balance:{type: db.mongoose.Schema.Types.ObjectId,ref:'balanceModel'},
//     id_user:{type: db.mongoose.Schema.Types.ObjectId,ref:'usersModel'},
//     id_cat:{type: db.mongoose.Schema.Types.ObjectId,ref:'categoryModel'},
//     title:{type:String,required:true},
//     price:{type:Number,required:true},
//     description:{type: String},
//     is_expense: { type: Boolean, default: true },
//     date:{type:Date,required:true}
// },{collection:'record'});



let usersModel = db.mongoose.model('usersModel',userSchema);


module.exports={
   usersModel
}