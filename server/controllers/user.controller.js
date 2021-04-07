 const User = require('../models/user.model')





 //GET USER BY ID
 module.exports.getUserByIdGET = (req, res) => {
     id = req.params.id
     User.findById(id, (err, data) => {
         if (err) {
             console.log(err)
         }
         res.json({
             data
         })
     })
 }

 //GET ALL USERS
 module.exports.getAllUsersGET = (req, res) => {
     User.find({}, (err, data) => {
         if (err) {
             console.log(err)
         }
         res.json({
             data
         })
     })
 }


 //UPDATE USER
 module.exports.updateUserUPDATE = (req, res) => {

     const id = req.params.id;
     const {
         firstName,
         lastName,
         bio,
         birthday,
         location,
         school,
         relashioshipStatus,
         sex,
         isSeller,
         Living,
         image
     } = req.body
     User.findByIdAndUpdate(id, {
        firstName,
        lastName,
        bio,
        birthday,
        location,
        school,
        relashioshipStatus,
        sex,
        isSeller,
        Living,
        image


         }, {
             useFindAndModify: false
         })
         .then(data => {
             if (!data) {
                 res.status(404).send({
                     message: `Cannot update User with id=${id}. Maybe User was not found!`
                 });
             } else res.send({
                 message: "User was updated successfully."
             });
         })
         .catch(err => {
             res.status(500).send({
                 message: "Error updating User with id=" + id
             });
         });
 }


 //DELETE USER 
 module.exports.deleteUserDELETE = (req, res) => {
     User.findByIdAndRemove(id)
         .then(data => {
             if (!data) {
                 res.status(404).send({
                     message: `Cannot delete user with id=${id}. Maybe user was not found!`
                 });
             } else {
                 res.send({
                     message: "user was deleted successfully!"
                 });
             }
         })
         .catch(err => {
             res.status(500).send({
                 message: "Could not delete post with id=" + id
             });
         });
 }



 module.exports.addStoreUPDATE = (req,res)=>{
     let userId = req.params.userId


    const {storeId} = req.body
    User.findByIdAndUpdate(userId, {
        storeId
 }, {
             useFindAndModify: false
         })
         .then(data => {
             if (!data) {
                 res.status(404).send({
                     message: `Cannot update User with id=${id}. Maybe User was not found!`
                 });
             } else res.send({
                 message: "User was updated successfully."
             });
         })
         .catch(err => {
             res.status(500).send({
                 message: "Error updating User with id=" + id
             });
         });
 }