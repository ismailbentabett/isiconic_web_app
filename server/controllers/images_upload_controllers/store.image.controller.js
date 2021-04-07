const mongoose = require('mongoose');
const path = require('path');
const crypto = require('crypto') //to generate file name
const multer = require('multer')
const GridFsStorage = require('multer-gridfs-storage')
const Grid = require('gridfs-stream')
require('dotenv').config()

var uuid = require('uuid');

const getStoretId = (req, res, next) => {

    req.store_id = req.params.store_id;
    next();
}
let conn = mongoose.connection
let gfs
conn.once('open', () => {
    //initialize our stream
    gfs = Grid(conn.db, mongoose.mongo)
    gfs.collection('storeImages')
})




let storage = new GridFsStorage({
    url: process.env.DB_URI,
    file: (req, file) => {
        userId = req.userData._id;
        return new Promise(
            (resolve, reject) => {
                const fileInfo = {

                    filename: uuid.v4() + '_' + file.originalname,
                    bucketName: "storeImages",
                    metadata: {
                        userId: userId,
                        type: "store",
                        store_id:  req.store_id,
                    }

                }
                resolve(fileInfo)

            }
        )
    }
})

const upload = multer({
    storage
})


module.exports = {
    upload,
    gfs,
    getStoretId
}
module.exports.imageUploadPOST = (req, res) => {
    res.json({
        file: req.file
    })

}



module.exports.imageArrayGET = async (req, res) => {
    gfs.files.find({}).toArray((err, files) => {
        //check if files exist
        if (!files || files.length == 0) {
            return res.status(404).json({
                err: "No files exist"
            })
        }
        // files exist



        let newfiles = files.filter((x) => {

            return x.metadata.userId == `${req.userData._id}` && x.metadata.postId == `${req.params.post_id}`;

        })
        return res.json(newfiles)


    })
}

module.exports.imageAdminArrayGET = (req, res) => {
    gfs.files.find({}).toArray((err, files) => {
        //check if files exist
        if (!files || files.length == 0) {
            return res.status(404).json({
                err: "No files exist"
            })
        }
        // files exist
        return res.json(files)
    })
}

module.exports.imageGET = (req, res) => {
    gfs.files.findOne({
        filename: req.params.filename
    }, (err, file) => {
        //check if files exist
        if (!file || file.length == 0) {
            return res.status(404).json({
                err: "No files exist"
            })
        }
        //file exist
        if (file.metadata.userId == `${req.userData._id}`) {
            return res.json(file)

        }
    })
}
module.exports.imageAdminGET = (req, res) => {
    gfs.files.findOne({
        filename: req.params.filename
    }, (err, file) => {
        //check if files exist
        if (!file || file.length == 0) {
            return res.status(404).json({
                err: "No files exist"
            })
        }
        //file exist
        return res.json(file)
    })
}
module.exports.imageDisplayGET = (req, res) => {
    gfs.files.findOne({
        filename: req.params.filename
    }, (err, file) => {
        //check if files exist
        if (!file || file.length == 0) {
            return res.status(404).json({
                err: "No files exist"
            })
        }
        //check if image
        if (file.contentType === 'image/jpeg' || file.contentType === "img/png" || file.contentType === "image/png") {
            //read output to browser

                const readStream = gfs.createReadStream(file.filename)
                readStream.pipe(res)
        

        } else {
            res.status(404).json({
                err: "Not an image"
            })
        }
    })
}

module.exports.imageDELETE = async (req, res) => {



    gfs.remove({
        _id: req.params.id || image.metadata.userId == `${req.userData._id}`,
        root: 'storeImages'
    }, (err, gridStore) => {
        if (err) return handleError(err);
        res.send('image deleted successfullt')

    })



}



module.exports.imageaAdminDisplayGET = (req, res) => {
    gfs.files.findOne({
        filename: req.params.filename
    }, (err, file) => {
        //check if files exist
        if (!file || file.length == 0) {
            return res.status(404).json({
                err: "No files exist"
            })
        }
        //check if image
        if (file.contentType === 'image/jpeg' || file.contentType === "img/png" || file.contentType === "image/png") {
            //read output to browser
            const readStream = gfs.createReadStream(file.filename)
            readStream.pipe(res)
        } else {
            res.status(404).json({
                err: "Not an image"
            })
        }
    })
}

module.exports.imageAdminDELETE = async (req, res) => {

    gfs.remove({
        _id: req.params.id,
        root: 'storeImages'
    }, (err, gridStore) => {
        if (err) {
            return res.status(404).json({
                err: err
            })
        }
        res.redirect("/")
    })


}