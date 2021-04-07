const Post = require("../models/post.model");


module.exports.postsGET = async (req, res) => {
  try {
    const userId = req.userData._id;
    const result = await Post.find({
      'userID': userId
    });
    res.send(result);
  } catch (err) {
    console.log(err);
    res.status(500).send("Something went wrong, check logs");
  }

}



module.exports.postsPOST = (req, res) => {
  userID = req.userData._id;


  const {
    title,
    content,
    type
  } = req.body;
  const post = new Post({
    title: title,
    content: content,
    type: type,
    userID: userID,
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
      res.status(500).send({
        message: err.message || "Some error occurred while creating the post."
      });
    });

}





module.exports.postsUPDATE = (req, res) => {
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


module.exports.postsDELETE = (req, res) => {
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