const MyModel = require('../../models/model')
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

exports.listUsers = async (req, res, next) => {
    let dataR = {

    }

    let dieu_kien =null;
    if(typeof(req.query.username)!='undefined'){
        let username =req.query.username;
        dieu_kien={username:username};
        console.log(dieu_kien);
    }
    //code xử lý lấy danh sách
    let list = []
    try {
        list = await MyModel.usersModel.find(dieu_kien);
        dataR.data = list;
    }
    catch (err) {
        dataR.msg = err.message;
    }

    //trả về client
    res.json(dataR);
    console.log(dataR);
}
exports.register = async (req, res, next) => {
    try {
  const { username, password, email,sex,dob,phone,image,fullname,role } = req.body;

  // Kiểm tra xem tên người dùng đã tồn tại chưa
  const existingUser = await MyModel.usersModel.findOne({ username });
  if (existingUser) {
    return res.status(400).json({ message: 'Tên người dùng đã tồn tại' });
  }

  // Mã hóa mật khẩu
  const hashedPassword = await bcrypt.hash(password, 10);

  // Tạo người dùng mới
  const user = new MyModel.usersModel({ username, password: hashedPassword,email,sex,dob,phone,image,fullname,role });
  await user.save();

  res.status(201).json({ message: 'Đăng ký thành công' });
} catch (error) {
  console.error('Đăng ký thất bại:', error);
  res.status(500).json({ message: 'Đăng ký thất bại' });
}

}



// exports.addUsers =async (req, res, next) => {
//     let dataR = {
//         status: 1,
//         msg: "ok"
//     }
//     if(req.method =='POST'){
       
//         let objUser = new MyModel.usersModel();
//         objUser.email = req.body.email;
//         objUser.username = req.body.username;
//         objUser.password=req.body.password;
//         objUser.role = 'User';
        
//         try{
//             let dataR = await objUser.save();
            
//             console.log(dataR);

//             console.log("Đã ghi thành công");
           
//         }catch(err){
//             console.log(err);
//             dataR.msg = err.message;
//         }
 
//     }

//     //code xử lý add


//     //trả về client
//     res.json(dataR)

// }

// exports.updateUsers = (req, res, next) => {
//     let data = {
//         status: 1,
//         msg: "ok"
//     }

//     //code xử lý update


//     //trả về client
//     res.json(data)

// }

// exports.deleteUsers = (req, res, next) => {
//     let data = {
//         status: 1,
//         msg: "ok"
//     }

//     //code xử lý  delete


//     //trả về client
//     res.json(data)

// }
