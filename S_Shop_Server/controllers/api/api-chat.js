const Mymodel = require('../../models/Chat');
exports.listChat = async (req, res, next) => {
    let dataR = {

    }

    let list = []
    try {
        list = await Mymodel.ChatModel.find();
        dataR.data = list;
    }
    catch (err) {
        dataR.msg = err.message;
    }

    //trả về client
    res.json(dataR);
    console.log(dataR);
}