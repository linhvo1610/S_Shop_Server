const BillMore = require('../../models/BillMore');
const Cart = require('../../models/Cart');


class ApiController {

    addBill(req, res, next) {
        const billmore = req.body;
        // const idArray = billmore.list.map(item => item._id);
        BillMore.create(billmore).then(()=> {
            Cart.deleteMany({ _id: { $in: idArray } })
                .catch(err => res.json(err))
        }).catch(err => res.json(err));
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
        const id_bill = req.params.id_bill;
        BillMore.findOne({ _id: id_bill })
            .then(bill => {
                if (bill.status === 0) {
                    bill.status = 4;
                    bill.save().then(rs => res.json(1)).catch(err => res.json(err));
                } else {
                    res.json(-1);
                }
            })
            .catch(err => res.json(err));
    }



}



module.exports = new ApiController;