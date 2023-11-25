const BillMore = require('../../models/BillMore');
const Cart = require('../../models/Cart');
const MyModel = require('../../models/product.model'); // Adjust the path based on your project structure

class ApiController {

    addBill = async (req, res, next) => {
        const billmore = req.body;

        try {
            // Extract the list of products from the bill
            const productList = billmore.list;

            // Iterate through each product in the bill
            for (const product of productList) {
                const productId = product.id_product;
                const size = product.size;
                const quantityToReduce = product.quantity;

                // Find the product in the inventory by ID
                const foundProduct = await MyModel.productModel.findById(productId);

                if (foundProduct) {
                    // Find the size in the product's sizes array
                    const foundSize = foundProduct.sizes.find((s) => s.size === size);

                    if (foundSize && foundSize.quantity >= quantityToReduce) {
                        // Update the quantity of the specific size in the inventory
                        foundSize.quantity -= quantityToReduce;

                        // Save the changes to the product
                        await foundProduct.save();
                    } else {
                        // Handle the case where the specified size is not available in sufficient quantity
                        return res.status(400).json({ error: 'Insufficient quantity for the specified size.' });
                    }
                } else {
                    // Handle the case where the specified product ID is not found in the inventory
                    return res.status(400).json({ error: 'Product not found in inventory.' });
                }
            }

            // Continue with creating the bill in the BillMore collection
            await BillMore.create(billmore);

            // Delete the corresponding items from the Cart collection
            const idArray = productList.map(item => item._id);
            await Cart.deleteMany({ _id: { $in: idArray } });

            res.status(200).json({ message: 'Bill added successfully.' });
        } catch (error) {
            // Handle any errors that occur during the process
            console.error(error);
            res.status(500).json({ error: 'Internal server error.' });
        }
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