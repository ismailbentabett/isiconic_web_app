const User = require('../models/user.model')
const Post = require('../models/post.model')





module.exports.PostsAllGET = async (req, res) => {
    Post.find({}, (err, data) => {
        if (err) {
            console.log(err)
        }
        res.json({
            data
        })
    })

}



module.exports.userPostsGET = async (req, res) => {

    try {
        let userID = req.params.id;
        const result = await Post.find({
            'userID': userID
        });
        res.send(result);
    } catch (err) {
        console.log(err);
        res.status(500).send("Something went wrong, check logs");
    }
}

module.exports.postByIdGET = async (req, res) => {
   
        let id = req.params.id;
      await Post.findById(id,(err,data)=>{
        if(err){console.log(err)}
        res.send(data)
      })
}
module.exports.postByTagGET = async (req, res) => {
   
    let tag = req.params.tag;
  await Post.find({tags:tag},(err,data)=>{
    if(err){console.log(err)}
    res.send(data)
  })
}
module.exports.userPostsPOST = (req, res) => {

    userID = req.params.id;


    const {
        title,
        content,
        tags,
        subTitle,
        isProduct,
        productID,
    } = req.body;
    const post = new Post({
        title: title,
        content: content,
        tags: tags,
        userID: userID,
        subTitle: subTitle,
        isProduct: isProduct,
        productID: productID,
        //image: String,
        //isProduct: Boolean,
        //productID: productID,
    });

    // Save Tutorial in the database
    post
        .save(post)
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







module.exports.userPostsUPDATE = (req, res) => {
    if (!req.body) {
        return res.status(400).send({
            message: "Data to update can not be empty!"
        });
    }

    const id = req.params.id;

    Post.findByIdAndUpdate(id, req.body, {
            useFindAndModify: false
        })
        .then(data => {
            if (!data) {
                res.status(404).send({
                    message: `Cannot update post with id=${id}. Maybe post was not found!`
                });
            } else res.send({
                message: "post was updated successfully."
            });
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating post with id=" + id
            });
        });
}


module.exports.userPostsDELETE = (req, res) => {
    const id = req.params.id;

    Post.findByIdAndRemove(id)
        .then(data => {
            if (!data) {
                res.status(404).send({
                    message: `Cannot delete post with id=${id}. Maybe post was not found!`
                });
            } else {
                res.send({
                    message: "post was deleted successfully!"
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete post with id=" + id
            });
        });
}



module.exports.addImages = async (req, res) => {
    let id = req.params.id
    const {
        image
    } = req.body
    await Post.findByIdAndUpdate(id, {
        $addToSet: {
            image
        }
    }, {
        new: true,
        runValidators: true
    })

    res.send(image)
}