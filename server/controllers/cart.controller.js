const Cart = require("../models/cart.model");



module.exports.cartGET = async (req, res) => {
    let user_id = req.params.user_id

    await Cart.findOne({
        userId: user_id
    }, function (err, data) {
        if (err) {
            console.log(err)
        }
        res.send(data)
    })
}

module.exports.createCartPOST = (req, res) => {
    let user_id = req.params.user_id

    const {} = req.body
    Cart.create({
        userId,
        active,
    }, function (err, post) {
        if (err) return next(err);
        res.send(post);
    });

}

module.exports.addToCartUPDATE = async (req, res) => {
    console.log("if u read this and u r a girl u r a hoe ")
    let user_id = req.params.user_id

    const {
        productId,
        quantity,
        name,
        price


    } = req.body;

    try {


        const add_tp_cart = await Cart.findOneAndUpdate({
            userId: user_id
        }, {
            $addToSet: {
                products: {
                    productId,
                    quantity,
                    name,
                    price
                },

            }
        }, {
            new: true,
            runValidators: true
        })

        res.send(
            "add_tp_cart")

    } catch (error) {
        console.log(error)
    }

}

module.exports.deleteProductUPDATE = async (req, res) => {
    let user_id = req.params.user_id

    const {
        productId,
        quantity,
        name,
        price


    } = req.body;

    try {


        const add_tp_cart = await Cart.findOneAndUpdate({
            userId: user_id
        }, {
            $pull: {
                products: {
                    productId,
                    quantity,
                    name,
                    price
                },

            }
        }, {
            new: true,
            runValidators: true
        })

        res.send(
            "add_tp_cart")

    } catch (error) {
        console.log(error)
    }


}



module.exports.updateCartProduct = async (req, res) => {

    let user_id = req.params.user_id
    let product_id = req.params.product_id
    const {
        productId,
        quantity,
        name,
        price


    } = req.body;
   

    
        
    var update = {quantity,productId ,name,price};
    Cart.findOneAndUpdate({userId: user_id, 'products.productId': product_id}, {'$set':  {'products.$': update}},  function(error, result) {
            if (error) {
                res.send(error);
            } else {
                res.send(result);
            }
        });

 


}