const Story = require('../models/story.model')

module.exports.storyAllGET = (req, res) => {
    Story.find({}, (err, data) => {
        if (err) {
            console.log(err)
        }
        res.send(data)
    })
}
module.exports.userstoryGET = (req, res) => {
    let id = req.params.id
    Story.findOne({userId:id}, (err, data) => {
        if (err) {
            console.log(err)
        }
        res.send(data)
    })
}
module.exports.userstoryPOST = (req, res) => {
    let id = req.params.id


    const {
        content,
        userId
    } = req.body

    const story = new Story({
            content,
       
            userId
        })
        story .save(story)
        .then((data) => {
            res.send(data)
        })
        .catch((err) => {
            console.log(err)
        })

}
module.exports.userstoryDELETE = (req, res) => {
    let id = req.params.id

    Story.findByIdAndDelete(id, (err, data) => {
        if (err) {
            console.log(err)
        }
        res.send(data)
    })
}


module.exports.userstoryUPDATE = (req, res) => {
    let id = req.params.id
    const {
        content,

    } = req.body

    Story.findByIdAndUpdate(id, (err, data) => {
        if (err) {
            console.log(err)
        }
        res.send(data)
    })
}


module.exports.addImages  = async (req, res) =>{
    let id = req.params.id
    const {image} = req.body
    await Story.findByIdAndUpdate(id, {
    
            image            
    }, {
        new: true,
        runValidators: true
    })

    res.send(image)
}