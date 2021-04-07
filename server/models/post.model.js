const mongoose = require('mongoose');
const postSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Please enter a title'],

    },
    subTitle: {
        type: String,
        required: [true, 'Please enter a title'],

    },
    content: {
        type: String,
        required: [true, 'Please enter a content'],

    },
    userID: String,
    image: [String],
    tags:[{type:String,    default: ['post'],}],
    isProduct: Boolean,

    productID: String,
    created_at: {
        type: Date,
        default: Date.now

    },
    updated_at: {
        type: Date,
        default: Date.now
    },
    likes: [{type:String,    default: [''],}],
    dislikes: [{type:String,    default: [''],}],
    loves: [{type:String,    default: [''],}],
})


const Post = mongoose.model('post', postSchema);

module.exports = Post;