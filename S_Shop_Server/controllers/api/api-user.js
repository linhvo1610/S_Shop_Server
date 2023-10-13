const MyModel = require('../../models/model')

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



exports.addUsers =async (req, res, next) => {
    let dataR = {

    }
    if(req.method =='POST'){
       
        let objUser = new MyModel.usersModel();
        objUser.email = req.body.email;
        objUser.username = req.body.username;
        objUser.password=req.body.password;
        objUser.role = 'User';
        objUser.fullname = req.body.fullname;
        objUser.image = req.body.image;
        objUser.sex= req.body.sex;
        objUser.phone= req.body.phone;
        objUser.dob = req.body.dob;

        
        try{
            let dataR = await objUser.save();
            
            console.log(dataR);

            console.log("Đã ghi thành công");
           
        }catch(err){
            console.log(err);
            dataR.msg = err.message;
        }
 
    }

    //code xử lý add


    //trả về client
    res.json(dataR)

}

exports.loginUser = async (req, res, next) =>{  
    const { username, password } = req.body;
    const user = await MyModel.usersModel.findOne({ username, password });
    if (user) {
      // Trả về thông tin người dùng 
      res.json(user);
    } else {
      res.status(401).json({ message: 'Đăng nhập không thành công' });
    }
}

exports.registerUser = async (req, res, next) =>{
    const { username, fullname, email, image ,password, dob, sex, role, phone} = req.body;
    const existingUser = await MyModel.usersModel.findOne({ username });
    if (existingUser) {
      return res.status(409).json({ message: 'Tên người dùng đã tồn tại' });
    }

    const existingEmail = await MyModel.usersModel.findOne({ email });
    if (existingEmail) {
      return res.status(409).json({ message: 'Email người dùng đã tồn tại' });
    }

    const newPerson = new MyModel.usersModel({ username, fullname , email, image, password, dob, sex, role, phone });
  
    newPerson
      .save()
      .then(() => {
        res.status(201).json({ message: "Lưu thành công" });
      })
      .catch((error) => {
        console.error("Lưu thất bại:", error);
        res.status(500).json({ error: "Lỗi server" });
      });
}

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
