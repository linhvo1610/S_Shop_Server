const BillMore = require('../../models/BillMore');
const Cart = require('../../models/Cart');
const axios = require('axios');
const Notify = require('../../models/Notify');


class ApiController {

    addBill(req, res, next) {
        const billmore = req.body;
        const idArray = billmore.list.map(item => item._id);
        const token = req.params.token;
        BillMore.create(billmore).then(billmore => {
            Cart.deleteMany({ _id: { $in: idArray } })
                .then(() => {
                    Notify.create({ id_billmore: billmore.id, id_user: billmore.id_user, status: 0 }).then(
                        () => {
                            const data = {
                                "data": {
                                    "title": "Có thông báo mới",
                                    "body": "Đơn hàng có mã " + billmore.id + " đặt thành công",
                                },
                                "to": token
                            };

                            const headers = {
                                "Authorization": 'key=AAAA0ev3PJg:APA91bHTxySW9rLJIK_w3kftopTPUJHR7RTIuZK8rFFvCi2G5EKk1EHoq-rVARhldurbbuSGo6QAPw91X12ohT1IGbjjeQVO8lWZEnry0c8o9IojlPkTsfK0JLFQb48j1UglV_x6LQTO',
                                "Content-Type": "application/json"
                            };

                            axios.post('https://fcm.googleapis.com/fcm/send', data, { headers })
                                .then(function (response) {
                                    console.log('gửi thông báo đến thiết bị thành công', data)
                                })
                                .catch(function (error) {
                                    console.log('gửi thông báo đến thiết bị thất bại')
                                });
                            res.json(billmore);


                        }
                    ).catch(err => { 
                        console.log(err);
                        res.json(err) });
                })
                .catch(err => { 
                    console.log(err);
                    res.json(err) })
        }).catch(err => {
            console.log(err); 
            res.json(err) });
    }

    getAll(req, res, next) {
        const id_user = req.params.id_user;
        BillMore.find({ id_user: id_user })
            .then((arr) => {
                res.json(arr);
            })
            .catch(err => res.json(null));
    }

    cancelBill(req, res, next) {
        const id_billmore = req.params.id_billmore;
        BillMore.findOne({ _id: id_billmore })
            .then(billmore => {
                if (billmore.status === 0) {
                    billmore.status = 4;
                    billmore.save().then(rs => res.json(1)).catch(err => res.json(err));
                } else {
                    res.json(-1);
                }
            })
            .catch(err => res.json(err));
    }

    updateBill(req, res, next) {
        const id_billmore = req.params.id_billmore;
        BillMore.findOne({ _id: id_billmore })
            .then(billmore => {
                if (billmore.status === 3) {
                    billmore.status = 5;
                    billmore.save().then(rs => res.json(1)).catch(err => res.json(err));
                } else {
                    res.json(-1);
                }
            })
            .catch(err => res.json(err));
    }

}



module.exports = new ApiController;