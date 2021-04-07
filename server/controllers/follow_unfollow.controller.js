const User = require('../models/user.model')

const {
    registerValidation,
    loginValidation
} = require('../helpers/validation')
const charHelper = require('../helpers/user_chat')


module.exports.followUPDATE = async (req, res) => {
    let recieverId = req.params.reciever_id;
    let followerId = req.userData._id;
const {followers,followings} = req.body 
    try {
        const reciever_save_followers = await User.findByIdAndUpdate(recieverId, {
            $addToSet: {
                followers            }
        }, {
            new: true,
            runValidators: true
        })
        const follower_save_followings = await User.findByIdAndUpdate(followerId, {
            $addToSet: {
                followings            }
        }, {
            new: true,
            runValidators: true
        })
        if (!reciever_save_followers || !follower_save_followings) {
            return res.status(404).send('yeah u fucked up')
        }
        charHelper.generateRooms()
        res.status(201).send({
            'reciever_save_followers': reciever_save_followers,
            'follower_save_followings': follower_save_followings
        })
    } catch (error) {
       console.log(error)
    } 
 

}

module.exports.unfollowUPDATE = async (req, res) => {
    let recieverId = req.params.reciever_id;
    let followerId = req.userData._id;
const {followers,followings} = req.body 
    try {
        const reciever_save_followers = await User.findByIdAndUpdate(recieverId, {
            $pull: {
                followers            }
        }, {
            new: true,
            runValidators: true
        })
        const follower_save_followings = await User.findByIdAndUpdate(followerId, {
            $pull: {
                followings            }
        }, {
            new: true,
            runValidators: true
        })
        if (!reciever_save_followers || !follower_save_followings) {
            return res.status(404).send('yeah u fucked up')
        }
        res.status(201).send({
            'reciever_save_followers': reciever_save_followers,
            'follower_save_followings': follower_save_followings
        })
    } catch (error) {
        res.status(400).send(error)
    }
}