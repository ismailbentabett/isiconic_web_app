const Comment = require('../models/post.comment.model')


module.exports.commentGET = async (req, res) => {
    let postId = req.params.postId

    Comment.find({
        postId: postId
    }, (err, data) => {
        if (err) {
            console.log(err)
        }
        res.send(data)
    })


}
module.exports.commentPOST = async (req, res) => {
    console.log("laki rabiti latay goltili goodbye")

    const {
        userId,
        username,
        detail,
        postId,
        parentCommentId

    } = req.body;
    const comment = new Comment({
        userId,
        username,
        detail,
        postId,
        parentCommentId
    });

    // Save Tutorial in the database
    comment
        .save(comment)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            console.log(err)
            res.status(500).send({
                err
            });
        });




}


module.exports.addRepliesPUT = async (req, res) => {
    let parentCommentId = req.params.parentCommentId

    const {
        userId,
        username,
        detail,


    } = req.body;

    try {


        const save_like = await Comment.findByIdAndUpdate(parentCommentId, {
            $push: {
                replies: {
                    userId,
                    username,
                    detail,
                }

            }
        }, {
            new: true,
            runValidators: true
        })

        res.send({
            postId
        })

    } catch (error) {
        console.log(error)
    }



}
module.exports.commentPUT = async (req, res) => {}
module.exports.commentDELETE = async (req, res) => {}