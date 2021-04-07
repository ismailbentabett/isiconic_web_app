const User = require('../models/user.model')
const Cart = require('../models/cart.model')
module.exports.createCart = async () =>{
    let users = await User.find({}, (err, data) => {
        if (err) {
          console.log(err)
        }
        return data
      })


let ids = users.map(x=>{
return x._id
})

let finalresult = ids.map(x=>{
    return {
        "userId":x,
        "total":0
    }
})

Cart.insertMany(finalresult, {
    ordered: false
  })
  .then(function (docs) {
    console.log("Number of documents inserted: " + docs.length);

    // console.log({ msg: "rooms uploaded to MongoDB Successfully!" });
  })
  .catch(function (err) {
    // error handling here
    console.log("Failed to insert Bulk...not really");
  });


}