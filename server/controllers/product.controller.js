//product_schema
const Product = require("../models/product.model");
const Store = require('../models/store.model.js');


module.exports.ProductsAllGET = async (req, res) => {
    Product.find({}, (err, data) => {
        if (err) {
            console.log(err)
        }
        res.send({
            data
        })
    })

}

module.exports.userProductsGET = async (req, res) => {
    id = req.userData._id;
    try {
        let userId = req.params.user_id;
        const result = await Product.find({
            'userID': userId
        });
        res.send(result);
    } catch (err) {
        console.log(err);
        res.status(500).send("Something went wrong, check logs");
    }
}

module.exports.storeProductsGET = async (req,res) =>{
    //
    id = req.userData._id;
    try {
        let storeId = req.params.store_id;
        const result = await Product.find({
            'storeId': storeId
        });
        res.send(result);
    } catch (err) {
        console.log(err);
        res.status(500).send("Something went wrong, check logs");
    }
}




module.exports.userProductsPOST = async (req, res) => {



let store_id = req.params.store_id

    const {
        name,
        description,
        quantity,
        price,
        category,
        Subcategory,
        userID,
        
    } = req.body;
    const product = new Product({
        name: name,
        description: description,
        quantity: quantity,
        price: price,
        category: category,
        Subcategory: Subcategory,

        userID: userID,
        storeId: store_id,

    });

    // Save Tutorial in the database
    product
        .save(product)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
           console.log(err)
        });

}





module.exports.getOneProductGET = async (req, res) =>{
let id = req.params.id
   await  Product.findById(id,function (err,data) {
        if(err){return err}
        return data
    })
}

module.exports.userProductsUPDATE = (req, res) => {
    if (!req.body) {
        return res.status(400).send({
            message: "Data to update can not be empty!"
        });
    }

    const id = req.params.id;

    Product.findByIdAndUpdate(id, req.body, {
            useFindAndModify: false
        })
        .then(data => {
            if (!data) {
                res.status(404).send({
                    message: `Cannot update Product with id=${id}. Maybe Product was not found!`
                });
            } else res.send({
                message: "Product was updated successfully."
            });
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating Product with id=" + id
            });
        });
}


module.exports.userProductsDELETE = (req, res) => {
    const id = req.params.id;

    Product.findByIdAndRemove(id)
        .then(data => {
            if (!data) {
                res.status(404).send({
                    message: `Cannot delete Product with id=${id}. Maybe Product was not found!`
                });
            } else {
                res.send({
                    message: "Product was deleted successfully!"
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete post with id=" + id
            });
        });
}

module.exports.addImages  = async (req, res) =>{
    let id = req.params.id
    const {image} = req.body
    await Product.findByIdAndUpdate(id, {
        $addToSet: {
            image            }
    }, {
        new: true,
        runValidators: true
    })

    res.send(image)
}