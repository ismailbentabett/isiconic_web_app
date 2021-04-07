var mongoose = require('mongoose'),
    Schema = mongoose.Schema;
var StorySchema = new mongoose.Schema({
    content: {type:String,required:true},
    image:  String,
    userId: {type:String,unique:true},
    expireAt: { 
        type: Date, 
        default: Date.now,
        index: { expires: 86400 }
      }
});


module.exports = mongoose.model('Story', StorySchema);