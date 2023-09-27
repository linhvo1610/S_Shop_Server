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
