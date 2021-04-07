
const Post = require('../models/post.model')


/*
  router.put('/unlikelike/:postId', postReactionsController.unlikeUPDATE)
router.put('/undislike/:postId', postReactionsController.undislikeUPDATE)
router.put('/unlove/:postId', postReactionsController.unloveUpdate)
*/ 

module.exports.likeUPDATE = async (req, res) => {
    let postId = req.params.postId;
    
const {reactionistId} = req.body 

    try {

      
        const save_like = await Post.findByIdAndUpdate(postId, {
            $addToSet: {
                likes :  reactionistId
            
            }
        }, {
            new: true,
            runValidators: true
        })
  
       res.send({postId})
        
    } catch (error) {
       console.log(error)
    } 
 

}




module.exports.unlikeUPDATE = async (req, res) => {
    let postId = req.params.postId;
    
const {reactionistId} = req.body 

    try {

      
        const save_like = await Post.findByIdAndUpdate(postId, {
             $pull: {
                likes :  reactionistId
            
            }
        }, {
            new: true,
            runValidators: true
        })
  
        res.send({postId})
        
    } catch (error) {
       console.log(error)
    } 
 

}
















module.exports.dislikeUPDATE = async (req, res) => {
    let postId = req.params.postId;
    
const {reactionistId} = req.body 

    try {

      
        const save_like = await Post.findByIdAndUpdate(postId, {
            $addToSet: {
                dislikes :  reactionistId
            
            }
        }, {
            new: true,
            runValidators: true
        })
  
        res.send({postId})
        
    } catch (error) {
       console.log(error)
    } 
 

}




module.exports.undislikeUPDATE = async (req, res) => {
    let postId = req.params.postId;
    
const {reactionistId} = req.body 

    try {

      
        const save_like = await Post.findByIdAndUpdate(postId, {
             $pull: {
                dislikes :  reactionistId
            
            }
        }, {
            new: true,
            runValidators: true
        })
  
        res.send({postId})
        
    } catch (error) {
       console.log(error)
    } 
 

}









module.exports.loveUPDATE = async (req, res) => {
    let postId = req.params.postId;
    
const {reactionistId} = req.body 

    try {

      
        const save_like = await Post.findByIdAndUpdate(postId, {
            $addToSet: {
                loves :  reactionistId
            
            }
        }, {
            new: true,
            runValidators: true
        })
  
        res.send({postId})
        
    } catch (error) {
       console.log(error)
    } 
 

}




module.exports.unloveUPDATE = async (req, res) => {
    let postId = req.params.postId;
    
const {reactionistId} = req.body 

    try {

      
        const save_like = await Post.findByIdAndUpdate(postId, {
             $pull: {
                loves :  reactionistId
            
            }
        }, {
            new: true,
            runValidators: true
        })
  
        res.send({postId})
        
    } catch (error) {
       console.log(error)
    } 
 

}







