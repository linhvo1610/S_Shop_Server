const { ChatModel } = require('../models/Chat');

exports.listChat =async (req,res,next)=>{
        var conversations = await ChatModel.find().populate('users');
        console.log(conversations);
        res.render("users/chats", { conversations:conversations });
}
exports.list = async(req,res,next)=>{
    //Hiển thị danh sach san pham
    
    //kiểm tra tồn tại tham số
    let dieu_kien =null;
    if(typeof(req.query.username)!='undefined'){
        let username =req.query.username;
        dieu_kien={username:username};
        console.log(dieu_kien);
    }
    

    //var list=await myModel.spModel.find(dieu_kien).sort({name:1});
    //cair tieens lay them the loai
    var list=await myModel.usersModel.find(dieu_kien);
    console.log(list);

    res.render('users/users',{list:list})
}