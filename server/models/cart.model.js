const mongoose = require("mongoose");


var products = mongoose.Schema({
  productId: String,
        quantity: Number,
        name: String,
        price: Number,
  _id : {id:false},

});


const CartSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      unique:true
    },
    products: [
      products
    ],
    active: {
      type: Boolean,
      default: true
    },
    modifiedOn: {
      type: Date,
      default: Date.now
    },

    total: {
        type: Number,
    }
  },
  
  { timestamps: true }
);

module.exports = mongoose.model("Cart", CartSchema);